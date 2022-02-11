import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { APIServiceService } from 'src/app/api-service.service';
import { Site } from 'src/app/models/site.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'completed', 'userId']
  dataSource = new MatTableDataSource<Site>()
  selection = new SelectionModel<Site>(true, []);
  filters: string[] = [];
  filteredData: any[] = [];
  originalData: any[] = [];

  constructor(private service: APIServiceService) {
  }

  ngOnInit(): void {
    this.getData()
    this.dataSource.filterPredicate = this.filterPredicate
  }

  getData() {
    this.service.getData().subscribe((data:Site[]) => {
      this.originalData = this.dataSource.data
      this.dataSource.data = data

    })
  }

  onFilter(filterValues: string): void {
    if (!this.filters.includes(filterValues)) {
      this.filters.push(filterValues);
    } else {
      const index = this.filters.indexOf(filterValues);
      this.filters.splice(index, 1);
    }
    if (this.filters.length === 0) {
      this.dataSource.data = this.originalData;
    } else {
      console.log(filterValues)
      this.filteredData = this.dataSource.data.filter((site) => {
        console.log('site', site )
        return this.filters.includes(site.accessMedia);
      });
      console.log('filterdata',this.filteredData)
      this.dataSource.data = this.filteredData;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.dataSource.data.forEach((element:Site) => this.selection.select(element));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  filterPredicate(data:any, filter: string) {
    console.log('data',data)
    console.log('filter',filter);
    let datas = JSON.stringify(data).includes(filter)
    return datas
  }
}
