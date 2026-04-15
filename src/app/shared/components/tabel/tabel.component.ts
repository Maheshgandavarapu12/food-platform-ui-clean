import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-tabel',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.scss',
  standalone: true,
})
export class TabelComponent implements AfterViewInit {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() actionTemplate!: TemplateRef<any>;
  @Input() isNoShadow: boolean = true;
  @Input() showPaginator: boolean = true;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cols: string[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.cols = this.columns.filter(col => !col.hidden).map(col => col.key);
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource.data = this.data;
  }
}
