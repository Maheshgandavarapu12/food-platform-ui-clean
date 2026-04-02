import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { UserRole } from './core/models/auth.models';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'auth/login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./features/auth/auth.module')
//         .then(m => m.AuthModule),
//     canActivate: [NoAuthGuard]
//   },
//   {
//     path: 'user',
//     loadChildren: () =>
//       import('./features/user/user.module')
//         .then(m => m.UserModule),
//     canActivate: [AuthGuard, RoleGuard],
//     data: { roles: [UserRole.Customer] }
//   },
//   {
//     path: 'seller',
//     loadChildren: () =>
//       import('./features/seller/seller.module')
//         .then(m => m.SellerModule),
//     canActivate: [AuthGuard, RoleGuard],
//     data: { roles: [UserRole.Seller] }
//   },
//   {
//     path: 'forbidden',
//     loadChildren: () =>
//       import('./features/errors/errors.module')
//         .then(m => m.ErrorsModule)
//   },
//   {
//     path: '**',
//     redirectTo: 'auth/login'
//   }
// ];

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },

  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Customer] }
  },

  {
    path: 'seller',
    loadChildren: () => import('./features/seller/seller.module').then(m => m.SellerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Seller] }
  },

  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin] }
  },

  {
    path: 'super-admin',
    loadChildren: () => import('./features/super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.SuperAdmin] }
  },

  {
    path: 'forbidden',
    loadChildren: () => import('./features/errors/errors.module').then(m => m.ErrorsModule)
  },

  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}