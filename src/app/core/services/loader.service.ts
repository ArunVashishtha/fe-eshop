import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader = new BehaviorSubject<boolean>(false);

  getLoader() {
    return this.loader.asObservable();
  }
  
  setLoader(state: boolean) {
    this.loader.next(state);
  }
}
