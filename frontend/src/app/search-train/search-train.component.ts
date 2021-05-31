import { Component, OnInit,Output } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent implements OnInit {

  alltrain:any;
  // dataSource:any;
  constructor(private _search:SearchService, private router:Router) { }

  ngOnInit(): void {
    console.log('on init -train.components');
    this._search.getSourceTrain().subscribe((result)=>{
      console.log(result);
      this.alltrain=result
    })
    // this.dataSource=new MatTableDataSource(this.alltrain);
  }

  // applyFilter(event:Event){
  //   const filterValue=(event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  makereserervation(){
  this.router.navigate(['login']);
  }
}
