import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For connecting to the backend
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  menuVisible = false;
  moviesVisible = false;
  celebsVisible = false;

  searchCategory: string = 'title'; 
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleMovies() {
    this.moviesVisible = !this.moviesVisible;
    if (this.moviesVisible) {
      this.celebsVisible = false;
    }
  }

  toggleCelebs() {
    this.celebsVisible = !this.celebsVisible;
    if (this.celebsVisible) {
      this.moviesVisible = false;
    }
  }
  706496

  
  // search() {
  //   const searchEndpoint = `http://your-backend-api/search`;
  //   const params = { category: this.searchCategory, query: this.searchQuery };

  //   this.http.get(searchEndpoint, { params }).subscribe((results) => {
  //     console.log('Search Results:', results);
      
  //   }, (error) => {
  //     console.error('Error performing search:', error);
  //   });
  // }
}
