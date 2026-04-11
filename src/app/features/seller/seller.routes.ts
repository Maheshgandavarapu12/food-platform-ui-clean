import { Routes } from '@angular/router';
import { SellerLayoutComponent } from '../layout/seller-layout/seller-layout.component';
export const sellerRoutes: Routes = [
    {
        path: '',
        component: SellerLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
                pathMatch:'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'items',
                loadComponent: () => import('./items/items.component').then(m => m.ItemsComponent)
            }
        ]
    }
]