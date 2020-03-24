import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

import { Product } from 'app/model/product.model'
import { Donation } from 'app/model/donation.model'
import { GatewayService } from 'app/shared/gateway.service';
import { AuthService } from 'app/main/auth.service';

@Component({
    selector: 'donation-create',
    templateUrl: './donation.create.component.html',
    styleUrls: ['./donation.create.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationCreateComponent implements OnInit, OnDestroy {

    productForm: FormGroup;
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
        this.productForm = this.createProductForm();

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
            quantity: [0]
        });
    }

    deleteItem(index) {
        this.donations.splice(index, 1);
        this.table.renderRows();
    }

    addItem() {
        let product = new Product(
            this.productForm.get('name').value,
            this.productForm.get('quantity').value
        );
        this.donations.push(product)
        this.table.renderRows();
        this.resetForm(this.productForm)
    }

    resetForm(form: FormGroup) {
        form.reset();
        Object.keys(form.controls).forEach(key => {
            form.get(key).setErrors(null);
        });
    }

    confirm() {
        this.gatewayService.getUser(this.authService.getToken())
            .subscribe(
                user => {
                    if (user) {
                        user = user;

                        let donation = new Donation(
                            user.id, this.donations, 1
                        );

                        console.log(donation)


                        this.gatewayService.createDonation(donation, this.authService.getToken())
                            .subscribe(
                                donation => {
                                    if (donation) {
                                        this.router.navigate(['/donation/list']);
                                    } else {
                                        this.msgError = 'Ocorreu um erro ao salvar os dados. Tente novamente mais tarde!';
                                    }
                                },
                                error => {
                                    if (error.status === 400) {
                                        this.msgError = 'Confira os campos digitados e tente novamente!';
                                    } else {
                                        this.msgError = 'Ocorreu um erro ao salvar os dados. Tente novamente mais tarde!';
                                    }
                                }
                            );



                    } else {
                        console.error('Ocorreu um erro.');
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

}
