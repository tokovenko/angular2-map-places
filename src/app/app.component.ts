/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, AfterContentInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Search} from './components/search';
import {NavBar} from './components/nav-bar';
import {PlaceInfo} from './components/place-info';
import {Map} from './components/map';
import {AppState} from './app.service';

import { Place } from './models/place.model';

import { PlaceService } from './services/place.service';
import { MapService } from './components/map/map.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [PlaceService, MapService],
  directives: [Search, NavBar, PlaceInfo, Map],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: require('./app.html')
})

export class App implements AfterContentInit {
    public loading = false;
    public name = 'Map App';
    public isSearchOpen = false;
    public place: Place;

    constructor(
        public appState: AppState,
        private placeService: PlaceService,
        private mapService: MapService) {
            placeService.placeViewed$.subscribe(place => {
                this.isSearchOpen = false;
                this.place = place;
            });
            mapService.markerClicked$.subscribe(place => {
                this.place = place;
            });
    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

    openSearch() {
        this.isSearchOpen = true;
    }
    closeSearch() {
        this.isSearchOpen = false;
    }
    ngAfterContentInit() {
    }

}
