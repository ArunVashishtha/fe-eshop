import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // private categorySubject = new BehaviorSubject<string>(''); // Default empty category
  // category$: Observable<string> = this.categorySubject.asObservable();

  constructor(private apiService: ApiService) {}

  // setCategory(category: string): void {
  //   this.categorySubject.next(category);
  // }
  // getCategory(): string {
  //   return this.categorySubject.value;
  // }
  
  search(query: string) {
    return this.apiService.search.get({
      params: {
        query
      }
    }).pipe(map(res => {
      (res || []).forEach(res => {
        res._id = res.id;
      })
      return res;
    }));
  }
}
