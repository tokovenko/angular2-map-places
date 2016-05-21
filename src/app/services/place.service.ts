import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Place } from './../models/place.model';

@Injectable()
export class PlaceService {
    public places: Place[] = [];

    // Observable string sources
    private placeAddedSource = new Subject<Place>();
    public placeAdded$ = this.placeAddedSource.asObservable();

    private placeRemovedSource = new Subject<Place>();
    public placeRemoved$ = this.placeRemovedSource.asObservable();

    public placeUpdatedSource = new Subject<Place>();
    public placeUpdated$ = this.placeUpdatedSource.asObservable();

    public addNewplace(place: Place) {
        this.places.push(place);
        this.placeAddedSource.next(place);
    }

    public removePlace(place: Place) {
        var index = this.places.indexOf(place);
        if (index > -1) {
            this.places.splice(index, 1);
        }
        this.placeRemovedSource.next(place);
    }
}
