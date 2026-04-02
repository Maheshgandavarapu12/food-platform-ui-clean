import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: '<div class="flex items-center justify-center min-h-screen"><div class="text-center"><h1 class="text-6xl font-bold text-red-600">403</h1><p class="text-2xl font-semibold mt-4">Access Forbidden</p><p class="text-gray-600 mt-2">You do not have permission to access this resource.</p><a href="/" class="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Go Home</a></div></div>',
  styles: []
})
export class ForbiddenComponent {}
