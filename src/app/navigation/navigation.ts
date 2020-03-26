import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'home',
                title    : 'Home',
                translate: 'NAV.HOME.TITLE',
                type     : 'item',
                icon     : 'home',
                url      : '/home'
            },
            {
                id       : 'donate',
                title    : 'Doações',
                translate: 'NAV.DONATE.TITLE',
                type     : 'item',
                icon     : 'favorite_border',
                url      : '/donation/list'
            },
            {
                id       : 'donation-center',
                title    : 'Centros de Doação',
                translate: 'NAV.DONATECENTER.TITLE',
                type     : 'item',
                icon     : 'location_on',
                url      : '/donation-center/list'
            }
        ]
    }
];
