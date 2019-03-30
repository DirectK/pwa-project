import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import {Event} from "../event";
import { EventService } from '../event.service';
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

  constructor(private eventService: EventService, private router: Router) { }

  async ngOnInit() {
    if (this.events == null){
      this.events = await this.eventService.getEvents();
    }
    this.lat = 53.381130; //where map and user marker are initiated
    this.lng = -1.470085;

    this.map = L.map('map').setView([this.lat, this.lng], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2FybW9uYm96aWEiLCJhIjoiY2p0c3NoOWp1MHA2eDRnbnBxYm1hOWQwdyJ9.p6481fF0iYHLy5CQFVLMeA'
    }).addTo(this.map);

    for (let e of this.events) {
      this.newFixedMarker(e.location, e.name, e.id);
    };
  
  }

  newFixedMarker(latlng, title, id) {
    var marker = L.marker(latlng, {
      id: id,
      title: title,
      alt: title,
      riseOnHover: true,
    }).addTo(this.map);

    var popContentBad = "<p>"+ title +"</p><a href='/events/" + id + "'> See Event Detail </a>";
    var popContentGood = "<a [routerLink]= /events" + "> See Event Detail </a>";

    marker.bindPopup(popContentBad).openPopup();

    this.fixedMarkers.push(marker);

  };


}
