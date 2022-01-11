import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { APIServiceService } from 'src/app/api-service.service';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'completed', 'userId']
  dataSource = new MatTableDataSource()
  data: Site[] = []
  filterValue:string = '';
  constructor(private service: APIServiceService) {
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.filterPredicate
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((data:Site[]) => {
      this.dataSource.data = data
    })
  }

  applyFilter(filterValue:string) {
    this.dataSource.filter = filterValue
  }

  getMessage(message: string) {
    this.filterValue = message;
}

  filterPredicate(data:any, filter: string) {
    let datas = JSON.stringify(data).includes(filter)
    return datas
  }
}
