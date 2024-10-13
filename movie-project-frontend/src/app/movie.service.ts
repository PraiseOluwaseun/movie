import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private backendUrl = 'https://your-backend-api.com';


  constructor(private httpClient: HttpClient) {  }
}
