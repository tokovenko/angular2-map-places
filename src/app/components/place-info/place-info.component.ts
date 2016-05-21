import {Component, Input} from '@angular/core';
import {Place} from './../../models/place.model';

import {PlaceService} from './../../services/place.service';
import {MapService} from './../../components/map/map.service';

import {ViewPlaceInfo} from './components/view-place-info';
import {EditPlaceInfo} from './components/edit-place-info';

@Component({
    selector: 'place-info',
    styles: [
        require('./place-info.css')
    ],
    template: require('./place-info.html'),
    directives: [ViewPlaceInfo, EditPlaceInfo]
})

export class PlaceInfo {

    public place: Place;

    public editable:boolean = false;

    constructor(
        private placeService: PlaceService,
        private mapService: MapService) {
            mapService.markerClicked$.subscribe(place => {
                this.place = place;
            });
            placeService.placeRemoved$.subscribe(place => {
                this.onClosePlaceInfo();
            });
    }

    public onEnableEditableMode() {
        this.editable = true;
    }

    public onDisableEditableMode() {
        this.editable = false;
    }

    public removePlace(place: Place) {
        if(!confirm('Are you realy want to delete this place?')) {
            return;
        }
        this.placeService.removePlace(place);
        this.editable = false;
    }

    public onClosePlaceInfo() {
        this.place = null;
        this.editable = false;
    }

    public onUpdatedPlace(place) {
    this.placeService.placeUpdatedSource.next(place);
        this.onClosePlaceInfo();
    }
}
