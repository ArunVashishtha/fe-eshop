// search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, filter } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group({
    query: ['']
  });

  searchResults: any[] = [];
  showSearchResults = false;
  categories = new Set<string>();
  subcategories = new Set<string>();

  constructor(private fb: FormBuilder,
    private searchService: SearchService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      filter((query: string) => query.length >= 3),
      switchMap((query: string) => this.searchService.search(query))
    ).subscribe(results => {
      this.searchResults = results;
      this.categories = new Set();
      this.subcategories = new Set();

      this.searchResults.forEach(element => {
        // Extract unique category names
        if (element.category) {
          this.categories.add(element.category);
        }

        // Extract unique subcategory names
        if (element.subcategory) {
          this.subcategories.add(element.subcategory);
        }
      });
      this.showSearchResults = true;
    });
  }

  onSearchFocus(): void {
    this.showSearchResults = true;
  }

  toggleSearchResults(): void {
    this.showSearchResults = !this.showSearchResults;
  }

  selectResult(result: any): void {
    this.showSearchResults = false;
    if (result?.id) {
      this.router.navigate(['/home', result.id]);
    }
  }

  selectCategory(result: string): void {
    this.showSearchResults = false;
    this.router.navigate(['/home'], {queryParams: {category: result}});
  }
}
