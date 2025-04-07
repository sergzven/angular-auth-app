import { Component, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { RouterLink, Router } from '@angular/router';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonDirective,
    RouterLink,
    HlmSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
})
export class LoginComponent {
  @ViewChild(FormGroupDirective)
  private _formGroupDirective!: FormGroupDirective;

  private _fb = inject(FormBuilder);
  private _auth = inject(AuthService);
  private _router = inject(Router);

  loading = false;

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  getErrorText(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  onReset() {
    this._formGroupDirective.resetForm();
  }
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.form.disable();
      const { email, password } = this.form.getRawValue();
      this._auth.login(email!, password!).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.loading = false;
          this.form.enable();
          this._router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          this.loading = false;
          this.form.enable();
          console.log('Error:', error);
        },
      });
    }
  }
}
