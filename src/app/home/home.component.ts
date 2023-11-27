import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval,Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor() { }

  private firstObssubscription :Subscription

  ngOnInit() {
  //  this.firstObssubscription = interval(1000).subscribe(count => {
  //   console.log(count);
  //  })

  const customIntervalObservable = Observable.create(observer => {
    let count = 0;
    setInterval(() => {
      observer.next(count);
      if(count === 2 ){
        observer.complete();
      }
      if(count > 3){
        observer.error(new Error('Count is greater than 3!'));
      }
      count++;
    },1000)
  });

  // this.firstObssubscription = customIntervalObservable.subscribe(data => {
  //   console.log(data);
  // },error => {
  //   console.log(error);
  //   alert(error.message);
  // }, complete => {
  //   console.log("!Complete")
  // })

  //Operators
  this.firstObssubscription = customIntervalObservable.pipe( filter((data:number) => {
    return data > 0
  }),map ((data:number) => {
    return 'Round: ' + (data + 1);
  }) ).subscribe(data => {
      console.log(data);
    },error => {
      console.log(error);
      alert(error.message);
    }, complete => {
      console.log("!Complete")
    })
  }

  ngOnDestroy(): void {
      this.firstObssubscription.unsubscribe();
  }


}
