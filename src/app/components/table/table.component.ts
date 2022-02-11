import { SelectionModel } from '@angular/cdk/collections';
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
  dataSource = new MatTableDataSource<Site>()
  selection = new SelectionModel<Site>(true, []);
  color: string = ''
  filterObject = {name:'', domain: ''}
  isChecked = false;
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
    let datas = JSON.stringify(data).includes(filter)
    return datas
  }
}
