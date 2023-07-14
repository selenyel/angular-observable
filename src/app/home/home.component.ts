import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { count } from 'rxjs-compat/operator/count';
import { filter, map } from 'rxjs/operators';

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
  private customNewObsSubscription2: Subscription;


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

    // const customIntervalObservable = Observable.create(observer =>{
    //   let count = 0;
    //   setInterval( () => {
    //     observer.next(count++);
    //   },1000)
    // })

    // this.firstObsSubscription = customIntervalObservable.subscribe( data => {
    //   console.log(data);
    // });

    // 3)

    // This is depricated so I will write what I found in here

    // const customIntervalObservable2 = new Observable<typeof this.A>((observer) => {
    //   let count = 0;
    //   setInterval( () => {
    //     if(count == 2){
    //       observer.complete();
    //     }
    //     if(count > 3){
    //       observer.error(new Error('Count is greater than 3!'));
    //     }
    //     observer.next(count++);
    //   },1000)
    // });

    // this.customNewObsSubscription = customIntervalObservable2
    // .subscribe(
    //   dat =>
    //   {
    //     console.error(dat);
    //   },
    //   error => {
    //     console.log(error);
    //     alert(error.message)
    //   },
    //   () => {
    //     console.log('Completed!')
    //   }
    // )



    // 4) 

    // This is the same thing but our complete condition is unreachable
    // So it never fires Completed! in the .subscribe method
    // In the end it fires an error handling console log 

    const customIntervalObservable3 = new Observable<typeof this.A>((observer) => {
      let count = 0;
      setInterval( () => {
        if(count == 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'));
        }
        observer.next(count++);
      },1000)
    });
    // observable takes all the normal, error and, completed cases and loops them
    // in a foreach to execute every subscriptor

    // customIntervalObservable3.pipe(map( (dat) => {
    //   return 'Round :' + (dat +1);
    // }));
    // Pipe method is built in in RxJs

    this.customNewObsSubscription2 = customIntervalObservable3
    .pipe(
      filter(
        (dat) => {
          return dat > 0
        }
      )
      ,
      map( 
        (dat : number) => {
      return 'Round :' + (dat +1);
    }))
    .subscribe(
      dat =>
      {
        console.log(dat);
      },// normally -every 1000ms in this case- we do this
      error => {
        console.log(error);
        alert(error.message)
      },//in observer.error case we do these 
      () => {
        console.log('Completed!')
      }//in observe.complete case we do this
    )

  }

  ngOnDestroy():void{
    this.firstObsSubscription.unsubscribe();
    // This means whenever we leave the component we clear that subscription!

    this.customNewObsSubscription.unsubscribe();
    
    this.customNewObsSubscription2.unsubscribe();
  }

}
