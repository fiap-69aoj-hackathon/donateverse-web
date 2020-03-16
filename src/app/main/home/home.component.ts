import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { Activity } from '../../model/activity.model';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    activities: Activity[];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _httpClient: HttpClient) {
        
            this._fuseTranslationLoaderService.loadTranslations(english, turkish);
            this.getActivities();
    }

    getActivities(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/activity')
                .subscribe((response: any) => {
                    console.log(response);
                    this.activities = response;
                    resolve(this.activities);
                }, reject);
        });
    }
}
