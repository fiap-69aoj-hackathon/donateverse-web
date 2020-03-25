import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AuthService } from 'app/main/auth.service';
import { MatTable } from '@angular/material/table';

import { fuseAnimations } from '@fuse/animations';

import * as moment from 'moment';

import { GatewayService } from 'app/shared/gateway.service';
import { DonationItem } from '../donation.item.model';
import { User } from 'app/model/user.model';
import { Donation } from 'app/model/donation.model';

@Component({
    selector     : 'donation-list',
    templateUrl  : './donation.list.component.html',
    styleUrls    : ['./donation.list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DonationListComponent implements OnInit, OnDestroy
{

    @ViewChild('table') table: MatTable<any>;
    displayedColumns: string[] = ['userName', 'userLocation', 'date', 'status', 'itens', 'options'];
    donations: DonationItem[] = [];
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
        this.gatewayService.getDonations(this.authService.getToken())
            .subscribe(
                donations => {
                    if (donations) {
                        this.getUsers(donations);
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

    async getUsers(donations: Donation[]) {
        try {
            
            for (const donation of donations) {
                let user = <User>await this.gatewayService.getUserById(this.authService.getToken(), donation.idUser);
                
                let products = '';
    
                if(donation.products.length > 0) {
                    const reducerProducts = (acc, curr) => acc + curr.amount +  ' ' + curr.description + ", ";
                    products = donation.products.reduce(reducerProducts, "");
                    products = products.slice(0, -2);
                }
    
                let date = moment(donation.creationDate, "YYYY-MM-DDTHH:mm:ss.SSSS");
                
                let donationList = new DonationItem(
                    donation.id,
                    user.id,
                    user.name,
                    user.city + ' - ' + user.state,
                    date.format('DD/MM/YYYY'),
                    donation.status,
                    products
                );
    
                this.donations.push(donationList);
            }
            this.table.renderRows();

        } catch(error) {
            console.log(error);
            this.showError('Ocorreu um erro.');
        }
    }

    showError(msg: string) {
        this.msgError = msg;
        setTimeout(() => {
            this.msgError = null;
        }, 3000);
    }

}
