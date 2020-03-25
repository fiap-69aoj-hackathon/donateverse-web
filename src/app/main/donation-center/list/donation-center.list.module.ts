import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DonationCenterListComponent } from './donation-center.list.component';
import { AuthGuard } from 'app/main/auth-guard.service';

const routes: Routes = [
    {
        path     : '**',
        component: DonationCenterListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DonationCenterListComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTableModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
    ]
})
export class DonationCenterListModule
{
}
