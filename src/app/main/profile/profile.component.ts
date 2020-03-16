import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import * as moment from 'moment';

import { User } from 'app/model/user.model';
import { GatewayService } from 'app/shared/gateway.service';
import { AuthService } from 'app/main/auth.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    user: User;
    about: any;

    /**
     * Constructor
     */
    constructor(
        private authService: AuthService,
        private gatewayService: GatewayService,
    ) { }

    ngOnInit(): void
    {
        this.gatewayService.getUser(this.authService.getToken())
        .subscribe(
            user => {
                if(user) {
                    this.user = user;

                    let now = moment(new Date());
                    let end = moment(user.birthday, "DD/MM/YYYY")
                    var duration = moment.duration(now.diff(end));
                    this.user.age = duration.years();
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
