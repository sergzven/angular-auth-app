import { Component, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import {
  HlmSelectImports,
  HlmSelectModule,
} from '../../../lib/ui/ui-select-helm/src/index';
import { HlmSelectOptionComponent } from '../../../lib/ui/ui-select-helm/src/lib/hlm-select-option.component';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronUp,
  lucideLoader,
} from '@ng-icons/lucide';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRoles } from '../../../core/models/user.mode';
import { validators } from 'tailwind-merge';

@Component({
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
    HlmSelectModule,
    HlmSelectOptionComponent,
    BrnSelectImports,
    HlmSelectImports,
    HlmSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [
    provideIcons({ lucideChevronUp, lucideChevronDown, lucideLoader }),
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
})
export class RegisterComponent {
  @ViewChild(FormGroupDirective)
  private _formGroupDirective!: FormGroupDirective;

  private _fb = inject(FormBuilder);
  private _auth = inject(AuthService);
  private _router = inject(Router);

  loading = false;
  userRoles = Object.values(UserRoles)

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required]],
    roles: [['user'], [Validators.required]],
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
    this.form.enable();
    this._formGroupDirective.resetForm();
  }
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.form.disable();
      const newUser = this.form.getRawValue();
      this._auth.signup(newUser as User).subscribe({
        next: () => {
          this._router.navigateByUrl('/auth');
        },
        error: (error) => {
          console.error('Signup failed', error);
        },
        complete: () => {
          this.loading = false;
          this.form.disable();
        },
      });
    }
  }
}
