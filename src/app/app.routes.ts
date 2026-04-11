import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'seller',
        loadChildren: () => import('./features/seller/seller.routes').then(m => m.sellerRoutes),
        canActivate:[authGuard]
    },
    { path: '**', redirectTo: 'auth/login' }//here we have to add a 404 page
];
