import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerService } from '../seller.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-item-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent {
  itemId!: string;
  itemForm!: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private sellerService: SellerService,
    private dialogRef: MatDialogRef<ItemFormComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      totalStock: ['', Validators.required],
      sellerId: ['', Validators.required],
      categoryId: ['', Validators.required],
      imageUri: [''],
      isOnSale: ['1', Validators.required]
    });
    if (this.data) {
      this.itemForm.addControl('itemId', this.fb.control(this.data.item.itemId));
      this.itemForm.patchValue(this.data.item);
    }
  }
  onSubmit() {
    this.itemForm.patchValue({
      sellerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      itemId: this.data?.item?.id || null
    });
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields', 'Error');
      return;
    }
    this.isLoading = true;

    if (this.data) {
      this.sellerService.editItem(this.itemForm.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe({
          next: (response) => {
            this.dialogRef.close(true);
            if (response.statusCode === 200) {
              this.toastr.success('Item updated successfully', 'Success');
            } else {
              this.toastr.error('Failed to update item', 'Error');
            }
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          }
        });
    }
    else {
      this.sellerService.createItem(this.itemForm.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe({
          next: (response) => {
            this.dialogRef.close(true);
            if (response.statusCode === 200) {
              this.toastr.success('Item created successfully', 'Success');
            } else {
              this.toastr.error('Failed to create item', 'Error');
            }
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          }
        });
    }
  }
}
