import { Subject }    from 'rxjs/Subject';

export class Place {
    public name:string = '';
    public description:string = '';
    public rating:string = '';
    public types: string[] ;
    public address:string = '';
    public phone:string = '';
    public lat:string = '';
    public lng:string = '';
    public views:number;
    public liked:boolean;

    public placeUpdatedSource = new Subject<Place>();
    public placeUpdated$ = this.placeUpdatedSource.asObservable();

    constructor(place) {
        this.name = place.name || '';
        this.description = place.description || '';
        this.rating = place.rating || '';
        this.types = place.types || [];
        this.address = place.address || '';
        this.phone = place.phone || '';
        this.lat = place.lat || 46.633333;
        this.lng = place.lng || 32.6;
        this.views = place.views || 0;
        this.liked = place.liked || false;
    }

    public addView() {
        this.views++;
    }

    public toggleLike() {
        this.liked = !this.liked;
    }
}
