import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { count } from 'rxjs-compat/operator/count';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription : Subscription;
  // This is where we store our subscriptions!
  // Because each time we visit home component 
  // We create a new interval observable
  // To track them we need to store them

  constructor() { }

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
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
  }

  ngOnDestroy():void{
    this.firstObsSubscription.unsubscribe();
    // This means whenever we leave the component we clear that subscription!
  }

}
