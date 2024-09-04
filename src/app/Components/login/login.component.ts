import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/services/Auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)
  
  isLoading: boolean = false



  // Create Form ReactiveFormsModule

  /*   LoginForm: FormGroup = new FormGroup(
      {
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
        rePassword: new FormControl(null),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
      }, this.checkRepasswordMatch
    ) */


  // Create Form FormBuilder

  LoginForm: FormGroup = this._FormBuilder.group({

    //  name:this._FormBuilder.control(null)
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, /* Validators.pattern(/^\w{6,}$/) */]]
  })

 


  submitLoginForm() {
    if (this.LoginForm.valid) {
      this.isLoading = true
      this.fetchApi()
    }
    else {
      this.LoginForm.markAllAsTouched()
      this.isLoading = false
    }
  }
  fetchApi() {
    this._AuthService.setLoginForm(this.LoginForm.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.showSuccess()
          setTimeout(() => {
            localStorage.setItem('userToken',res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
          }, 1500);
        }
       
        this.isLoading = false
      },
      error:()=>{
        this.isLoading = false
      }
    
    })
  }

  showSuccess() {
    this._ToastrService.success('', 'Success Welcome ☺..!', {
      timeOut: 1500,
      positionClass: 'toast-top-center',
    });
  }
  
}
