import {Component, Input, AfterContentInit} from '@angular/core';

import { Place} from './../../../../models/place.model';

@Component({
    selector: 'view-place-info',
    styles: [
        require('./view-place-info.css')
    ],
    template: require('./view-place-info.html')
})

export class ViewPlaceInfo implements AfterContentInit {
    @Input()
    public place: Place;

    public ngAfterContentInit() {
        this.place.addView();
    }

    public toogleLike() {
        this.place.toggleLike();
    }
}
