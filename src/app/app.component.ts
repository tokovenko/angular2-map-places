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

  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  ngAfterContentInit() {
      var closeSearchBtn = document.getElementById("close-search");
      var showSearchBtn = document.getElementById("show-search");
      var searchBlock = document.getElementById("search");
      closeSearchBtn.addEventListener('click', function() {
          searchBlock.style.display = 'none';
      });
      showSearchBtn.addEventListener('click', function() {
          searchBlock.style.display = 'block';
      });



  }
}
