import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { DD_MM_YYYY_Format } from 'app/shared/date.format.constants';
import { GatewayService } from 'app/shared/gateway.service';
import { User } from 'app/model/user.model';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format },
    ]
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    msgError: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private gatewayService: GatewayService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            birthday: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onRegister(): void {
        let user = new User(
            this.registerForm.get('name').value,
            this.registerForm.get('email').value,
            this.registerForm.get('phone').value,
            this.registerForm.get('birthday').value.format('DD/MM/YYYY'),
            this.registerForm.get('password').value
        );
        this.gatewayService.createUser(user)
        .subscribe(
            user => {
                if(user) {
                    this.router.navigate(['/register/success']);
                } else {
                    this.msgError = 'Ocorreu um erro ao salvar os dados. Tente novamente mais tarde!';
                }
            },
            error => {
                if(error.status === 400) {
                    this.msgError = 'Confira os campos digitados e tente novamente!';
                } else {
                    this.msgError = 'Ocorreu um erro ao salvar os dados. Tente novamente mais tarde!';
                }
            }
          );
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};