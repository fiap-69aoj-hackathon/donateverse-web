import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DonationViewComponent } from './donation.view.component';
import { AuthGuard } from 'app/main/auth-guard.service';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
    {
        path     : '**',
        component: DonationViewComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DonationViewComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatListModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
    ]
})
export class DonationViewModule
{
}
