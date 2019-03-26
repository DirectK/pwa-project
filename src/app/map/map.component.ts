import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map;

  constructor() { }

  ngOnInit() {
  }

  initMap() {
    alert('MAP')
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

}
