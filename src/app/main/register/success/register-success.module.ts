import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { FuseSharedModule } from '@fuse/shared.module';

import { RegisterSuccessComponent } from './register-success.component';

const routes = [
    {
        path     : '**',
        component: RegisterSuccessComponent
    }
];

@NgModule({
    declarations: [
        RegisterSuccessComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,

        FuseSharedModule
    ]
})
export class RegisterSuccessModule
{
}
