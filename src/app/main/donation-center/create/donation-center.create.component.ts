import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

import { Product } from 'app/model/product.model'
import { Donation } from 'app/model/donation.model'
import { GatewayService } from 'app/shared/gateway.service';
import { AuthService } from 'app/main/auth.service';
import { DonationCenter } from 'app/model/donation-center.model';
import { Address } from 'app/model/address.model';
import * as moment from 'moment';

@Component({
    selector: 'donation-center-create',
    templateUrl: './donation-center.create.component.html',
    styleUrls: ['./donation-center.create.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationCenterCreateComponent implements OnInit, OnDestroy {

    donationCenterForm: FormGroup;
    @ViewChild('table') table: MatTable<any>;
    msgError: string;

    displayedColumns: string[] = ['description', 'amount', 'options'];
    donations: Product[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private gatewayService: GatewayService,
        private authService: AuthService,
        private router: Router
    ) {
        // Set the private defaults
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.donationCenterForm = this.createProductForm();

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createProductForm(): FormGroup {
        return this._formBuilder.group({
            name: [''],
            description: [''],
            zipCode: [''],
            street: [''],
            number: [0],
            district: [''],
            city: [''],
            state: [''],
            additionalInfo: ['']
        });
    }

    searchAddress() {
        let zipCode = this.donationCenterForm.get('zipCode').value;

        this.gatewayService.getAddress(zipCode)
            .subscribe(
                address => {
                    if (address) {
                        this.donationCenterForm.get('street').setValue(address.logradouro);
                        this.donationCenterForm.get('district').setValue(address.bairro);
                        this.donationCenterForm.get('city').setValue(address.localidade);
                        this.donationCenterForm.get('state').setValue(address.uf);
                    } else {
                        this.showError('CEP não encontrato.');
                    }
                },
                error => {
                    console.error(error);
                    this.showError('Ocorreu um erro.');
                }
            );

    }

    confirm() {
        this.gatewayService.getUser(this.authService.getToken())
            .subscribe(
                user => {
                    if (user) {

                        let donationCenter = new DonationCenter(
                            new Address(
                                this.donationCenterForm.get('zipCode').value,
                                this.donationCenterForm.get('street').value,
                                this.donationCenterForm.get('number').value,
                                this.donationCenterForm.get('district').value,
                                this.donationCenterForm.get('city').value,
                                this.donationCenterForm.get('state').value,
                                this.donationCenterForm.get('additionalInfo').value
                            ),
                            user.id,
                            this.donationCenterForm.get('name').value,
                            true,
                            this.donationCenterForm.get('description').value,
                            moment().format()
                        );
                        
                        this.gatewayService.createDonationCenter(donationCenter)
                        .subscribe(
                            response => {
                                this.router.navigate(['/donation-center/list']);
                            },
                            error => {
                                console.error(error);
                                this.showError('Ocorreu um erro.');
                            }
                        );

                    } else {
                        console.error('Ocorreu um erro.');
                    }
                },
                error => {
                    console.error(error);
                    this.showError('Ocorreu um erro.');
                }
            );

    }

    showError(msg: string) {
        this.msgError = msg;
        setTimeout(() => {
            this.msgError = null;
        }, 5000);
    }

}
