import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { items } from '../../../core/models/seller';


const ELEMENT_DATA: items[] = [
  {id: "1", itemName: 'John Doe'},
  {id: "2", itemName: 'Jane Smith'},
  {id: "3", itemName: 'Mike Johnson'},
];
@Component({
  selector: 'app-items',
  imports: [MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  displayedColumns: string[] = ['id', 'itemName'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
