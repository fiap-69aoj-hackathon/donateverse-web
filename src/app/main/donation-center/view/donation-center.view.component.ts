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
import { DonationCenter } from 'app/model/donation-center.model';


@Component({
    selector: 'donation-center-view',
    templateUrl: './donation-center.view.component.html',
    styleUrls: ['./donation-center.view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationCenterViewComponent implements OnInit, OnDestroy {

    id: number;
    donationCenter: DonationCenter;
    msgError: string;

    constructor(
        private gatewayService: GatewayService,
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

        this.gatewayService.getDonationCenterById(this.id)
            .subscribe(
                donationCenter => {
                    if (donationCenter) {
                        this.donationCenter = donationCenter;
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

    showError(msg: string) {
        this.msgError = msg;
        setTimeout(() => {
            this.msgError = null;
        }, 3000);
    }

}
