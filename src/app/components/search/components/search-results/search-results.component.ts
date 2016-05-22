import {Component, Input} from '@angular/core';
import {SearchResultsItem} from './search-results-item';
import {PlaceService} from './../../../../services/place.service';
import {Place} from './../../../../models/place.model';

@Component({
    selector: 'search-results',
    styles: [
        require('./search-results.css')
    ],
    template: require('./search-results.html'),
    directives: [SearchResultsItem]
})

export class SearchResults {
    @Input()
    public places: Place[];
}
