import {Component, AfterContentInit} from '@angular/core';
import {SearchResults} from './components/search-results';

@Component({
    selector: 'search',
    styles: [
        require('./search.css')
    ],
    template: require('./search.html'),
    directives: [SearchResults]
})

export class Search implements AfterContentInit {
    ngAfterContentInit() {
    }
}
