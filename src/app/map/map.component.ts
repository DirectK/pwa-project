import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: L.map;
  lat;
  lng;
  location;
  fixedMarkers: L.marker[] = [];
  draggableMarker = L.marker;

  constructor() { }

  ngOnInit() {
    this.lat = 50.5; //where map and user marker are initiated
    this.lng = 30.5;

    this.map = L.map('map').setView([this.lat, this.lng], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2FybW9uYm96aWEiLCJhIjoiY2p0c3NoOWp1MHA2eDRnbnBxYm1hOWQwdyJ9.p6481fF0iYHLy5CQFVLMeA'
  }).addTo(this.map);

    this.newFixedMarker(50.5, 30.5, 'FUCK');
    this.newDraggableMarker(50.52, 30.52);
    this.draggableMarker.on('move', this.getDragMarkerLocation());
  }

  newFixedMarker(lat, lng, title) {
    var marker = L.marker([lat, lng], {
      title: title,
      alt: title,
      riseOnHover: true,
    }).addTo(this.map);

    this.fixedMarkers.push(marker);
  }

  newDraggableMarker(lat, lng) {
    var marker = L.marker([lat, lng], {
      title: 'New Event',
      alt: 'New Event',
      riseOnHover: true,
      draggable: true
    }).addTo(this.map);

    this.draggableMarker = marker;

  }

  getDragMarkerLocation() {
    this.location = this.draggableMarker.getLatLng();
    this.lat = this.location.lat;
    this.lng = this.location.lng;
  }

}
