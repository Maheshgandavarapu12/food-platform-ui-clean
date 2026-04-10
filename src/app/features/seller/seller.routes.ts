import { Routes } from '@angular/router';
export const sellerRoutes: Routes = [
{
    path: 'items',
    loadComponent: () => import('./items/items.component').then(m => m.ItemsComponent)
}
]