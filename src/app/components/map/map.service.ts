import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Place} from './../../models/place.model';

var GoogleMapsLoader = require('google-maps');


Injectable();

export class MapService {
    private key = 'AIzaSyA3bwECQTEaDZQagNZpG8MGxn3NsIsq6W0';
    private map = null;
    private google = null;
    private markers = [];

    private markerClickedSource = new Subject<Place>();
    public markerClicked$ = this.markerClickedSource.asObservable();

    private markerMovedSource = new Subject<Place>();
    public markerMoved$ = this.markerMovedSource.asObservable();

    public initMap() {
        GoogleMapsLoader.KEY = this.key;
        GoogleMapsLoader.load(google => {
            let myLatlng = new google.maps.LatLng(46.633333, 32.6);
            let options = {
              zoom: 14,
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var mapBlock = document.getElementById("map");
            mapBlock.style.height = window.innerHeight + 'px';
            mapBlock.style.width = window.innerWidth + 'px';

            this.map = new google.maps.Map(mapBlock, options);
            this.google = google;


            setTimeout(() => {
                var activeMarker;
                var addMarkerBtn = document.getElementById("add-marker");
                var placeInfo = document.getElementById("place-info");
                // addMarkerBtn.addEventListener('click', () => {
                //     console.log('add marker...');
                //     var myLatlng = new google.maps.LatLng(46.633333, 32.6);
                //     activeMarker = new google.maps.Marker({
                //         position: myLatlng,
                //         title:"New place",
                //         draggable: true,
                //         animation: google.maps.Animation.DROP
                //     });
                //     activeMarker.addListener('click', function(e) {
                //         placeInfo.style.display = 'block';
                //     });
                //     activeMarker.setMap(this.map);
                // });

                var closePlaceInfo = document.getElementById("close-place-info");
                closePlaceInfo.addEventListener('click', function() {
                    placeInfo.style.display = 'none';
                });


                var cancelEditInfo = document.getElementById("cancel-edit-info");
                cancelEditInfo.addEventListener('click', function() {
                    placeInfo.style.display = 'none';
                });

                var editInfo = document.getElementById("edit-info");
                var saveInfo = document.getElementById("save-info");
                var placeViewInfo = document.getElementById("place-view-info");
                var placeEditInfo = document.getElementById("place-edit-info");
                editInfo.addEventListener('click', function() {
                    placeViewInfo.style.display = 'none';
                    editInfo.style.display = 'none';
                    placeEditInfo.style.display = 'block';
                    saveInfo.style.display = 'block';
                });
                saveInfo.addEventListener('click', function() {
                    placeViewInfo.style.display = 'block';
                    editInfo.style.display = 'block';
                    placeEditInfo.style.display = 'none';
                    saveInfo.style.display = 'none';
                });
            }, 3000);

        });
    }

    public addPlaceMarker(place) {
        let myLatlng = new this.google.maps.LatLng(place.lat, place.lng);
        let marker = new this.google.maps.Marker({
            position: myLatlng,
            title: place.name || "New place",
            draggable: true,
            animation: this.google.maps.Animation.DROP
        });
        marker.place = place;

        var placeInfo = document.getElementById("place-info");
        marker.addListener('click', e => {
            this.markerClickedSource.next(place);
        });

        marker.addListener('dragend', e => {
            place.lat = e.latLng.lat();
            place.lng = e.latLng.lng();
            this.markerMovedSource.next(place);
        });

        marker.setMap(this.map);

        this.markers.push(marker);
    }


    public removePlaceMarker(place) {
        let marker = this.markers.filter(marker => {
              return marker.place === place;
        })[0];
        marker.setMap(null);

        let index = this.markers.indexOf(marker);
        if(index > -1) {
            this.markers.splice(index, 1);
        }
    }


    public updatePlaceMarker(place) {
        let marker = this.markers.filter(marker => {
              return marker.place === place;
        })[0];
        marker.setTitle(place.name);
    }
}
