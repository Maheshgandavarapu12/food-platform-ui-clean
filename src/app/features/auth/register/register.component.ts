import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole, Gender, AuthResponse } from '../../../core/models/auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;
  totalSteps = 3;

  // For role selection
  UserRole = UserRole;
  selectedRole: UserRole = UserRole.Customer;

  // For seller additional info
  sellerFields = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      // Step 1: Basic Info
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      
      // Step 2: Account Setup
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')
      ]],
      confirmPassword: ['', [Validators.required]],
      
      // Step 3: Additional Info
      role: [UserRole.Customer, [Validators.required]],
      gender: [''],
      dateOfBirth: [''],
      
      // Terms acceptance
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Listen for role changes
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.selectedRole = role;
      this.sellerFields = role === UserRole.Seller;
      
      // Update validators based on role
      if (this.sellerFields) {
        this.addSellerValidators();
      } else {
        this.removeSellerValidators();
      }
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  addSellerValidators(): void {
    // Add seller-specific validators if needed
  }

  removeSellerValidators(): void {
    // Remove seller-specific validators if needed
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      // Validate current step fields before proceeding
      if (this.validateCurrentStep()) {
        this.currentStep++;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(this.f['firstName'].valid && this.f['lastName'].valid && 
                 this.f['email'].valid && this.f['phoneNumber'].valid);
      case 2:
        return !!(this.f['password'].valid && this.f['confirmPassword'].valid && 
                 !this.registerForm.errors?.['passwordMismatch']);
      default:
        return true;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const registrationData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      phoneNumber: this.f['phoneNumber'].value,
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value,
      role: this.f['role'].value,
      gender: this.f['gender'].value || undefined,
      dateOfBirth: this.f['dateOfBirth'].value || undefined
    };

    const registerObservable = this.selectedRole === UserRole.Seller
      ? this.authService.registerSeller(registrationData)
      : this.authService.register(registrationData);

    registerObservable.subscribe({
      next: (response: AuthResponse) => {
        this.success = 'Registration successful! Redirecting to dashboard...';
        
        // Redirect after short delay
        setTimeout(() => {
          const dashboardRoute = this.authService.getDashboardRoute();
          this.router.navigate([dashboardRoute]);
        }, 2000);
      },
      error: (error: Error) => {
        this.error = error.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrength(): { score: number, label: string, color: string } {
    const password = this.f['password'].value || '';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    
    const strengthMap: { [key: number]: { label: string, color: string } } = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-orange-500' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' }
    };
    
    return { 
      score, 
      ...strengthMap[score as keyof typeof strengthMap] || strengthMap[0]
    };
  }
}