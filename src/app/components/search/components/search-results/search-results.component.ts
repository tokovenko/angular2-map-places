import {Component} from '@angular/core';
import {SearchResultsItem} from './search-results-item';

@Component({
    selector: 'search-results',
    styles: [
        require('./search-results.css')
    ],
    template: require('./search-results.html'),
    directives: [SearchResultsItem]
})

export class SearchResults {
}
