import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { count } from 'rxjs-compat/operator/count';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  private A : number

  private firstObsSubscription : Subscription;
  // This is where we store our subscriptions!
  // Because each time we visit home component 
  // We create a new interval observable
  // To track them we need to store them

  private customNewObsSubscription : Subscription;


  constructor() { }

  ngOnInit() {
    
    // 1)

    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    // This is interval, it gets a number which corresponds to miliseconds
    // Let's call it A
    // Each A time interval emits an another number
    // Which we can catch it inside of our arrow function
    // We named it count as in the example. 
    // count is the handler for all the data values that are emitted
    
    // But when we navigate away from this component,
    // it keeps counting
    // so if we don't need this, it causes a Memory Leak!
    // So we need to Unsubscribe from it!

    // 2)

    // Custom interval

    const customIntervalObservable = Observable.create(observer =>{
      let count = 0;
      setInterval( () => {
        observer.next(count++);
      },1000)
    })

    this.firstObsSubscription = customIntervalObservable.subscribe( data => {
      console.log(data);
    });

    // 3)

    // This is depricated so I will write what I found in here

    const customIntervalObservable2 = new Observable<typeof this.A>((observer) => {
      let count = 0;
      setInterval( () => {
        observer.next(count++);
      },1000)
    });

    this.customNewObsSubscription = customIntervalObservable2.subscribe(dat =>{
      console.error(dat);
    })

  }

  ngOnDestroy():void{
    this.firstObsSubscription.unsubscribe();
    // This means whenever we leave the component we clear that subscription!

    this.customNewObsSubscription.unsubscribe();
  }

}
