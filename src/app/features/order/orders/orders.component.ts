import { Component, inject, OnInit } from '@angular/core';
import { TabelComponent } from '../../../shared/components/tabel/tabel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../../core/models/seller';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  imports: [TabelComponent, MatIconModule, MatTooltipModule, MatSelectModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  ordersService = inject(OrdersService);
  toastr = inject(ToastrService);

  columns = [
    { key: 'id', label: 'Id', hidden: true },
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'orderAddress', label: 'Order Address' },
    { key: 'actions', label: 'Status' }
  ];
  data: Order[] = [
    { id: 1, orderNumber: '123', orderAddress: '123 Main St' },
    { id: 2, orderNumber: '456', orderAddress: '456 Oak Ave' },
    { id: 3, orderNumber: '789', orderAddress: '789 Pine Rd' },
  ];
  ngOnInit(): void {
    // this.loadOrders();
  }
  changeOrderStatus(id: string, status: number) {
    this.ordersService.changeOrderStatus(id, status).subscribe({
      next: (response) => {
        console.log('Order status updated successfully:', response);
        // this.loadOrders();
        this.toastr.success('Order status updated successfully');
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        this.toastr.error('Error updating order status');
      }
    });
  }

  loadOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (orders) => {
        this.data = orders.data;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }
}
