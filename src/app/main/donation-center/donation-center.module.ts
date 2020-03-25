import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'list',
        loadChildren: () => import('./list/donation-center.list.module').then(m => m.DonationCenterListModule)
    },
    {
        path        : 'create',
        loadChildren: () => import('./create/donation-center.create.module').then(m => m.DonationCenterCreateModule)
    },
    {
        path        : 'view/:id',
        loadChildren: () => import('./view/donation-center.view.module').then(m => m.DonationCenterViewModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class DonationCenterModule
{
}
