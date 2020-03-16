import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';
import { AuthGuard } from 'app/main/auth-guard.service';

const routes = [
    {
        path     : 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        HomeComponent
    ]
})

export class HomeModule
{
}
