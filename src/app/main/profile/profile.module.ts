import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/profile/profile.service';
import { ProfileComponent } from 'app/main/profile/profile.component';
import { AuthGuard } from 'app/main/auth-guard.service';

const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
