import { Component, OnInit } from '@angular/core';
import { TabelComponent } from '../../../shared/components/tabel/tabel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../../core/models/seller';

@Component({
  selector: 'app-orders',
  imports: [TabelComponent, MatIconModule, MatTooltipModule, MatSelectModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
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
  }
  changeOrderStatus(id: string, status: number) {
    console.log('Changing status for order:', id);
  }
}
