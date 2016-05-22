import {Component, Output, EventEmitter} from '@angular/core';
import {PlaceService} from './../../services/place.service';
import {Place} from './../../models/place.model';

@Component({
    selector: 'nav-bar',
    styles:[
        require('./nav-bar.css')
    ],
    template: require('./nav-bar.html')
})

export class NavBar {

    @Output()
    public openSearch: EventEmitter<any> = new EventEmitter();

    public currentTab: string = 'places';

    constructor(
      public placeService: PlaceService) {
    }

    public onAddNewPlace() {
        let place = new Place({
            name: 'test place'
        });
        this.placeService.addNewplace(place);
    }

    public onOpenSearch() {
        this.openSearch.next({});
    }

    public setCurrentTab(tab) {
        this.currentTab = tab;
    }
}
