import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Event} from "../event";
import * as L from 'leaflet';

@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.css']
})

/** Component for leaflet map - showing only
 * 
 * @Input events - list of events to be shown on map
 * @Output messageEvent
 */
export class MapFormComponent implements OnInit {

  map: L.map;
  lat;
  lng;
  location;
  fixedMarkers: L.marker[] = [];
  @Input() events: Event[] = [];
  draggableMarker = new L.marker;
  @Output() messageEvent = new EventEmitter<L.latLng>();

  constructor() { }

  //when initialized setup map and get events
  ngOnInit() {
    this.lat = 53.381130; //where map and user marker are initiated
    this.lng = -1.470085;

    this.map = L.map('mapForm').setView([this.lat, this.lng], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2FybW9uYm96aWEiLCJhIjoiY2p0c3NoOWp1MHA2eDRnbnBxYm1hOWQwdyJ9.p6481fF0iYHLy5CQFVLMeA'
    }).addTo(this.map);

    for (let e of this.events) {
      this.newFixedMarker(e.location, e.name);
    };

    this.newDraggableMarker(this.lat, this.lng);
    this.messageEvent.emit(new L.latLng(this.lat, this.lng));
  }

  
/** crete new Leaflet marker that isn't draggable */
  newFixedMarker(latlng, title) {
    var marker = L.marker(latlng, {
      title: title,
      alt: title,
      riseOnHover: true,
    }).addTo(this.map);


    this.fixedMarkers.push(marker);
  }

  /** create new draggable leaflet marker and get its location when
   * the markers moved
  */
  newDraggableMarker(lat, lng) {
    var marker = L.marker([lat, lng], {
      title: 'New Event',
      alt: 'New Event',
      riseOnHover: true,
      draggable: true
    }).addTo(this.map);
    marker.on('dragend', (event) => this.getDragMarkerLocation(event));
    this.draggableMarker = marker;

  }

  /** get the location of th marker */
  getDragMarkerLocation(event) {
    this.messageEvent.emit(this.draggableMarker.getLatLng());
  }

}
