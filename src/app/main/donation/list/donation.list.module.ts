import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DonationListComponent } from './donation.list.component';
import { AuthGuard } from 'app/main/auth-guard.service';

const routes: Routes = [
    {
        path     : '**',
        component: DonationListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DonationListComponent
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
export class DonationListModule
{
}
