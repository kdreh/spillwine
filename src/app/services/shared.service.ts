import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // Simulate server timer
  loading():Observable<any> {
    return of ('Loading operation complete').pipe(
      delay(3000)
    )
  }
}
