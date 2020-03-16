import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'create',
        loadChildren: () => import('./create/register.module').then(m => m.RegisterModule)
    },
    {
        path        : 'success',
        loadChildren: () => import('./success/register-success.module').then(m => m.RegisterSuccessModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class RegisterModule
{
}
