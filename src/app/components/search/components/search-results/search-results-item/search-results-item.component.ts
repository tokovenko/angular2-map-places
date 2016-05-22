import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Place} from './../../../../../models/place.model';
import {PlaceService} from './../../../../../services/place.service';

@Component({
    selector: 'search-results-item',
    styles: [
        require('./search-results-item.css')
    ],
    template: require('./search-results-item.html')
})

export class SearchResultsItem {
    @Input()
    public item: Place;

    constructor(private placeService: PlaceService) {
    }

    public onViewPlace(place: any) {
        console.log('onViewPlace: ', place)
        this.placeService.placeViewedSource.next(place);
    }
}
