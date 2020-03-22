import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'list',
        loadChildren: () => import('./list/donation.list.module').then(m => m.DonationListModule)
    },
    {
        path        : 'create',
        loadChildren: () => import('./create/donation.create.module').then(m => m.DonationCreateModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class DonationModule
{
}
