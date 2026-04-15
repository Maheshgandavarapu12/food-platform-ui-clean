import { Component } from '@angular/core';
import { StatsCardComponent } from '../../../shared/components/stats-card/stats-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TabelComponent } from '../../../shared/components/tabel/tabel.component';
import { Item } from '../../../core/models/seller';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCardComponent, MatGridListModule, TabelComponent,RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = [
    { title: 'New Order', count: 23, percentage: '+21%', isPositive: true, icon: 'shopping_cart' },
    { title: 'Shipped Order', count: 14, percentage: '+65%', isPositive: true, icon: 'local_shipping' },
    { title: 'Total Earnings', count: 2000, percentage: '-40%', isPositive: false, icon: 'report' },
    // { title: 'New Chat', count: 19, percentage: '+37%', isPositive: true, icon: 'chat' }
  ];

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

  data: Item[] = [
    { id: 1, itemName: 'John Doe', categoryName: 'Category 1', price: 10.99, quantity: 5, totalStock: 10, isOnSale: true, imageUri: '', sellerId: 'seller1', categoryId: 1 },
    { id: 2, itemName: 'Jane Smith', categoryName: 'Category 2', price: 15.99, quantity: 3, totalStock: 5, isOnSale: true, imageUri: '', sellerId: 'seller2', categoryId: 2 },
    { id: 3, itemName: 'Mike Johnson', categoryName: 'Category 3', price: 20.99, quantity: 7, totalStock: 10, isOnSale: false, imageUri: '', sellerId: 'seller3', categoryId: 3 },
  ];

}
