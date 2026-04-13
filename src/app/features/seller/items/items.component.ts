import { Component, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Item } from '../../../core/models/seller';
import { MatIconModule } from '@angular/material/icon';
import { SellerService } from '../seller.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItemFormComponent } from '../item-form/item-form.component';
import Swal from 'sweetalert2';
import { TabelComponent } from '../../../shared/components/tabel/tabel.component';

// const ELEMENT_DATA: Item[] = [
//   { id: 1, itemName: 'John Doe', categoryName: 'Category 1', price: 10.99, quantity: 5, totalStock: 10, isOnSale: true, imageUri: '', sellerId: 'seller1', categoryId: 1 },
//   { id: 2, itemName: 'Jane Smith', categoryName: 'Category 2', price: 15.99, quantity: 3, totalStock: 5, isOnSale: true, imageUri: '', sellerId: 'seller2', categoryId: 2 },
//   { id: 3, itemName: 'Mike Johnson', categoryName: 'Category 3', price: 20.99, quantity: 7, totalStock: 10, isOnSale: false, imageUri: '', sellerId: 'seller3', categoryId: 3 },
// ];
@Component({
  selector: 'app-items',
  imports: [MatIconModule, MatTooltipModule, TabelComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  cols: string[] = ['itemName', 'categoryName', 'price', 'quantity', 'totalStock', 'isOnSale', 'action'];
  isLoading: boolean = false;

  sellerService = inject(SellerService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  columns = [
    { key: 'id', label: 'ID', hidden: true },
    { key: 'itemName', label: 'Item Name' },
    { key: 'categoryName', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'totalStock', label: 'Total Stock' },
    { key: 'isOnSale', label: 'Is On Sale' },
    { key: 'actions', label: 'Actions' }
  ];

  data: Item[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.sellerService.getAllItems().subscribe({
      next: (data) => {
        this.data = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
  createItem() {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });

  }
  editItem(item: any) {
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
  deleteItem(itemId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#e74c3c',
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
