import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/Auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {


  step: number = 1
  isLoading: boolean = false


  Email:string=''

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)



  // Create Form FormBuilder  verfiyEmail
  verfiyEmailForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })


  // Create Form FormBuilder  verfiyEmail
  verfiyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  })

  // Create Form FormBuilder  resetPassword

  resetPasswordFrom: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })



  verfiyEmailSubmit(): void {
    console.log(this.Email);
    this.isLoading = true
    this._AuthService.setEmailVerfiy(this.verfiyEmailForm.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.showNextStep(`${res.message}`)
          this.isLoading = false
          this.step = 2
        }

      },
      error: (err) => {
      
        this.isLoading = false
      }
    })

  }


  verfiyCodeSubmit(): void {
    console.log(this.Email);
    
    this.isLoading = true
    this._AuthService.setCodeVerfiy(this.verfiyCodeForm.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.showNextStep(`Enter new Password `)
          this.isLoading = false
          this.step = 3
        }

      },
      error: (err) => {
        
        this.isLoading = false
      }
    })

  }

  ResetPasswordSubmit(): void {
    console.log(this.Email);
    this.showSuccess()
    this.isLoading = true
    this._AuthService.setResetPassword(this.resetPasswordFrom.value).subscribe({
      next: (res) => {
        this.isLoading = false
        localStorage.setItem('userToken', res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },
      error: (err) => {
      
        this.isLoading = false
      }
    })

  }

  showNextStep(x: string) {
    this._ToastrService.info('', `${x}`, {
      timeOut: 5000,
      positionClass: 'toast-top-center',
    });
  }
  showSuccess() {
    this._ToastrService.success('', 'Success Welcome ☺..!', {
      timeOut: 1200,
      positionClass: 'toast-top-center',
    });
  }
 

}
