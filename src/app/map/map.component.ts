import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import {Event} from "../event";
import { EventService } from '../event.service';
import * as L from 'leaflet';
import { EventComponent } from '../event/event.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

/** Component for leaflet map - showing only
 * 
 * @Input events - list of events to be shown on map
 * @Output messageEvent
 */
export class MapComponent implements OnInit {

  map: L.map;
  lat;
  lng;
  location;
  fixedMarkers: L.marker[] = [];
  @Input() events: Event[] = [];
  draggableMarker = L.marker;
  @Output() messageEvent = new EventEmitter<L.latLng>();

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  //when initialized setup map and get events
  async ngOnInit() {
    this.lat = 53.381130; //where map and user marker are initiated
    this.lng = -1.470085;
    
    this.map = L.map('map').setView([this.lat, this.lng], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZ2FybW9uYm96aWEiLCJhIjoiY2p0c3NoOWp1MHA2eDRnbnBxYm1hOWQwdyJ9.p6481fF0iYHLy5CQFVLMeA'
    }).addTo(this.map);
    
    this.eventService.activeEvent.subscribe(event => this.populateMap(event))
    this.eventService.events.subscribe(events => this.populateMap(events));
  }

  /**using list of events, create marker for each */
  populateMap(events) {
    if (events != null) {
      this.fixedMarkers.forEach(marker => this.map.removeLayer(marker));
      if (Array.isArray(events)) {
        events.forEach(e => this.newFixedMarker(e.location, e.name, e.id));
      } else {
        this.newFixedMarker(events.location, events.name, events.id);
      }
    }
  }

/** crete new Leaflet marker that isn't draggable */
  newFixedMarker(latlng, title, id) {
    var marker = L.marker(latlng, {
      id: id,
      title: title,
      alt: title,
      riseOnHover: true,
    }).addTo(this.map);

    const container = document.createElement("div");
    const textElem = document.createElement("a");
    textElem.setAttribute("href", "#")
    textElem.onclick = () => {
      this.router.navigateByUrl("/events/" + id);
      return false;
    };
    textElem.innerHTML = title;
    container.appendChild(textElem);

    marker.bindPopup(container); // .openPopup();

    this.map.panTo(latlng);
    this.fixedMarkers.push(marker);
  };


}
