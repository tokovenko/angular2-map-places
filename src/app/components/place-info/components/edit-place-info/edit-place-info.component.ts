import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Place} from  './../../../../models/place.model';

@Component({
    selector: 'edit-place-info',
    styles: [
        require('./edit-place-info.css')
    ],
    template: require('./edit-place-info.html')
})

export class EditPlaceInfo {
    @Input()
    public place: Place;

    @Output()
    public canceled: EventEmitter<any> = new EventEmitter();

    @Output()
    public updated: EventEmitter<any> = new EventEmitter();

    public submitted = false;

    public onSubmit() {
        if(!this.submitted) {
            this.submitted = true;
            return;
        }
        this.updated.next(this.place);
    }

    get placeInfo() {
        return JSON.stringify(this.place);
    }

    public onCloseInfo() {
        this.canceled.next({});
    }
}
