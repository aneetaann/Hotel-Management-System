import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from '../search-train/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _trainurl = 'http://localhost:2000/trains';

  constructor(private http:HttpClient) { }

  getSourceTrain(){
    return this.http.get(this._trainurl)
  }
}
