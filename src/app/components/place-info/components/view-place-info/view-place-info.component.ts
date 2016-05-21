import {Component, Input} from '@angular/core';

import { Place} from './../../../../models/place.model';

@Component({
    selector: 'view-place-info',
    styles: [
        require('./view-place-info.css')
    ],
    template: require('./view-place-info.html')
})

export class ViewPlaceInfo {
    @Input()
    place: Place;
}
