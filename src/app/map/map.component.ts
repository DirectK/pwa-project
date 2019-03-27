/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  constructor() { }

  ngOnInit() {
  }

  initMap() {
    alert('MAP')
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(39.305, -76.617),
      zoom: 8
    });
  }

}
