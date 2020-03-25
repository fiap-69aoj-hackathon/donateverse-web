import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AuthService } from 'app/main/auth.service';
import { MatTable } from '@angular/material/table';

import { fuseAnimations } from '@fuse/animations';

import * as moment from 'moment';

import { GatewayService } from 'app/shared/gateway.service';
import { DonationItem } from '../donation.item.model';
import { User } from 'app/model/user.model';
import { Donation } from 'app/model/donation.model';
import { DonationCenter } from 'app/model/donation-center.model'

@Component({
    selector     : 'donation-center-list',
    templateUrl  : './donation-center.list.component.html',
    styleUrls    : ['./donation-center.list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationCenterListComponent implements OnInit, OnDestroy
{

    @ViewChild('table') table: MatTable<any>;
    displayedColumns: string[] = ['name', 'description', 'addressCity', 'addressState', 'options'];
    donations: DonationCenter[] = [];
    msgError: string;

    constructor(
        private gatewayService: GatewayService,
        private authService: AuthService
    )
    {
        // Set the private defaults
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.gatewayService.listDonationCenter()
            .subscribe(
                donations => {
                    if (donations) {
                        this.donations = donations;
                    } else {
                        this.showError('Ocorreu um erro.');
                    }
                },
                error => {
                    console.error(error);
                    this.showError('Ocorreu um erro.');
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
