import {Component, AfterContentInit} from '@angular/core';

import { PlaceService } from './../../services/place.service';
import { Place} from './../../models/place.model';
import { MapService } from './map.service';

@Component({
    selector: 'map',
    styles:[
        require('./map.css')
    ],
    template: require('./map.html')
})

export class Map implements AfterContentInit {

    constructor(private placeService: PlaceService, private mapService: MapService) {
        placeService.placeAdded$.subscribe(place => {
            mapService.addPlaceMarker(place);
        });

        placeService.placeRemoved$.subscribe(place => {
            mapService.removePlaceMarker(place);
        });

        placeService.placeUpdated$.subscribe(place => {
            mapService.updatePlaceMarker(place);
        });
    };

    ngAfterContentInit() {
        this.mapService.initMap();

        setTimeout(() => {
            this.placeService.addNewplace(new Place({
              name: 'place 1',
              lat: 46.623333,
              lng: 32.604
            }));
            this.placeService.addNewplace(new Place({
              name: 'place 2',
              lat: 46.633333,
              lng: 32.61
            }));
            this.placeService.addNewplace(new Place({
              name: 'place 3',
              lat: 46.633333,
              lng: 32.59
            }));
        }, 2000);

    }
}
