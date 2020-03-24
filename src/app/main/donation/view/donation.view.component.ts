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


@Component({
    selector: 'donation-view',
    templateUrl: './donation.view.component.html',
    styleUrls: ['./donation.view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationViewComponent implements OnInit, OnDestroy {

    id: number;
    donationItem: DonationItem;
    displayedColumns: string[] = ['description', 'amount'];
    donations: Product[] = [];

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
                        console.error('Ocorreu um erro.');
                    }
                },
                error => {
                    console.error(error);
                }
            );



        console.log(this.id);
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
        let user = <User>await this.gatewayService.getUserById(this.authService.getToken(), donation.idUser);

        let date = moment(donation.creationDate, "YYYY-MM-DDTHH:mm:ss.SSSS");

        this.donationItem = new DonationItem(
            donation.id,
            user.id,
            user.name,
            user.city + ' - ' + user.state,
            date.format('DD/MM/YYYY')
        );

        this.donations = donation.products;

    }

}
