import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DonationCreateComponent } from './donation.create.component';
import { AuthGuard } from 'app/main/auth-guard.service';

const routes: Routes = [
    {
        path     : '**',
        component: DonationCreateComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DonationCreateComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
    ]
})
export class DonationCreateModule
{
}
