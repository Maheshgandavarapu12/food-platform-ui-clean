import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Item } from '../../../core/models/seller';
import { MatIconModule } from '@angular/material/icon';
import { SellerService } from '../seller.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItemFormComponent } from '../item-form/item-form.component';
import Swal from 'sweetalert2';

const ELEMENT_DATA: Item[] = [
  { id: 1, itemName: 'John Doe', categoryName: 'Category 1', price: 10.99, quantity: 5, totalStock: 10, isOnSale: 0, imageUri: '', sellerId: 'seller1', categoryId: 1 },
  { id: 2, itemName: 'Jane Smith', categoryName: 'Category 2', price: 15.99, quantity: 3, totalStock: 5, isOnSale: 1, imageUri: '', sellerId: 'seller2', categoryId: 2 },
  { id: 3, itemName: 'Mike Johnson', categoryName: 'Category 3', price: 20.99, quantity: 7, totalStock: 10, isOnSale: 0, imageUri: '', sellerId: 'seller3', categoryId: 3 },
];
@Component({
  selector: 'app-items',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  cols: string[] = ['itemName', 'categoryName', 'price', 'quantity', 'totalStock', 'isOnSale', 'action'];
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Item>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;
  
  sellerService = inject(SellerService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.Sort;
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.isLoading = true;
    this.sellerService.getAllItems().subscribe({
      next: (data) => {
        this.dataSource.data = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
  createItem(){
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });

  }
  editItem(item: any){
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '400px',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });

  }
  deleteItem(itemId: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sellerService.deleteItem(itemId).subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.toastr.success('Item deleted successfully', 'Success');
              this.loadData();
            } else {
              this.toastr.error('Failed to delete item', 'Error');
            }
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          }
        });
      }
    });
  }
}
