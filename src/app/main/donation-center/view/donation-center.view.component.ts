import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import * as moment from 'moment';

import { GatewayService } from 'app/shared/gateway.service';
import { AuthService } from 'app/main/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DonationItem } from '../donation.item.model';
import { Donation } from 'app/model/donation.model';
import { User } from 'app/model/user.model';
import { Product } from 'app/model/product.model';
import { DonationStatus } from 'app/model/donation.status.model';


@Component({
    selector: 'donation-center-view',
    templateUrl: './donation-center.view.component.html',
    styleUrls: ['./donation-center.view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationCenterViewComponent implements OnInit, OnDestroy {

    id: number;
    donationItem: DonationItem;
    displayedColumns: string[] = ['description', 'amount'];
    donations: Product[] = [];
    msgError: string;

    constructor(
        private gatewayService: GatewayService,
        private authService: AuthService,
        private route: ActivatedRoute) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.id = this.route.snapshot.params['id']

        this.gatewayService.getDonationById(this.authService.getToken(), this.id)
            .subscribe(
                donation => {
                    if (donation) {
                        this.getUsers(donation);
                    } else {
                        this.showError('Ocorreu um erro.');
                    }
                },
                error => {
                    console.log(error);
                    this.showError('Ocorreu um erro.');
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async getUsers(donation: Donation) {
        try {
            let user = <User>await this.gatewayService.getUserById(this.authService.getToken(), donation.idUser);
    
            let date = moment(donation.creationDate, "YYYY-MM-DDTHH:mm:ss.SSSS");
    
            this.donationItem = new DonationItem(
                donation.id,
                user.id,
                user.name,
                user.city + ' - ' + user.state,
                date.format('DD/MM/YYYY'),
                donation.status
            );
    
            this.donations = donation.products;

        } catch (error) {
            console.log(error);
            this.showError('Ocorreu um erro.');
        }
    }

    donate() {
        this.updateStatus(this.donationItem.id, new DonationStatus(2))
    }

    confirmDonate() {
        this.updateStatus(this.donationItem.id, new DonationStatus(3))
    }

    updateStatus(idDonation: number, status: DonationStatus) {
        this.gatewayService.updateStatus(idDonation, status, this.authService.getToken())
            .subscribe(
                donation => {
                    if (donation) {
                        this.getUsers(donation);
                    } else {
                        this.showError('Ocorreu um erro.');
                    }
                },
                error => {
                    console.log(error);
                    this.showError('Ocorreu um erro.');
                }
            );
    }

    showError(msg: string) {
        this.msgError = msg;
        setTimeout(() => {
            this.msgError = null;
        }, 3000);
    }

}
