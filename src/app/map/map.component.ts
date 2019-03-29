import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Event} from "../event";
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
  @Input() events: Event[] = [];
  draggableMarker = L.marker;
  @Output() messageEvent = new EventEmitter<L.latLng>();

  constructor() { }

  ngOnInit() {
    this.lat = 53.381130; //where map and user marker are initiated
    this.lng = -1.470085;

    this.map = L.map('map').setView([this.lat, this.lng], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2FybW9uYm96aWEiLCJhIjoiY2p0c3NoOWp1MHA2eDRnbnBxYm1hOWQwdyJ9.p6481fF0iYHLy5CQFVLMeA'
    }).addTo(this.map);

    alert(this.events)

    for (let e of this.events) {
      this.newFixedMarker(e.location, e.name);
    };

  
  }

  newFixedMarker(latlng, title) {
    var marker = L.marker(latlng, {
      title: title,
      alt: title,
      riseOnHover: true,
    }).addTo(this.map);

    this.fixedMarkers.push(marker);
  }


}
