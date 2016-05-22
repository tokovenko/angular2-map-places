import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {SearchResults} from './components/search-results';
import {PlaceService} from './../../services/place.service';
import {Place} from './../../models/place.model';

@Component({
    selector: 'search',
    styles: [
        require('./search.css')
    ],
    template: require('./search.html'),
    directives: [SearchResults],
    encapsulation: ViewEncapsulation.None
})

export class Search {
    public searchResults: Place[];
    public places: Place[];

    @Output()
    public closed:EventEmitter<any> = new EventEmitter();

    constructor(private placeService: PlaceService) {
        this.places = this.placeService.getPlaces();
    }

    public searchPlaces(searchText) {
        searchText = searchText.trim();
        this.searchResults = searchText.length > 2 ? this.places.filter(place => {
            var re = new RegExp(searchText, 'i');
            return re.test(place.name);
        }) : [];
    }

    public onClose() {
        this.closed.next({});
    }
}
