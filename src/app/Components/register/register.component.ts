import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/Auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)
  isLoading: boolean = false;


  // Create Form ReactiveFormsModule

  /*   RegisterForm: FormGroup = new FormGroup(
      {
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
        rePassword: new FormControl(null),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
      }, this.checkRepasswordMatch
    ) */


  // Create Form FormBuilder

  RegisterForm: FormGroup = this._FormBuilder.group({

    //  name:this._FormBuilder.control(null)

    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null,Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: [this.checkRepasswordMatch] })

  // Methods
  checkRepasswordMatch(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }


  submitRegisterForm() {
    if (this.RegisterForm.valid) {
      this.isLoading = true
      this.fetchApi()
    }
    else {
      this.RegisterForm.setErrors({ mismatch: true })
      this.RegisterForm.markAllAsTouched()
    }
  }
  fetchApi() {
    this._AuthService.setRegisterForm(this.RegisterForm.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.showSuccess()
          setTimeout(() => {
            this._Router.navigate(['/login'])
          }, 1500);
        }
        console.log(res);
        this.isLoading = false
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false

      },
    })
  }


  showSuccess() {
    this._ToastrService.success('', 'Success.!', {
      timeOut: 1500,
      positionClass: 'toast-top-center',
    });
  }
 
}
