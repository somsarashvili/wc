import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<L.Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;

  constructor(private http: HttpClient) {
  }

  map?: L.Map;
  zoom?: number;
  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: false,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })],
    zoom: 15,
    center: L.latLng(41.730811, 44.779581)
  }
  greenIcon = L.icon({
    iconUrl: '/assets/wc.png',

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -38] // point from which the popup should open relative to the iconAnchor
  });
  markers: L.Marker[] = [
    L.marker([41.730811, 44.779581], { icon: this.greenIcon }).bindPopup('მაღლა, დაბლა, სადღაც მანდა'),
    L.marker([41.7261055606886, 44.74963733728571], { icon: this.greenIcon }).bindPopup('Second Pin'),
    L.marker([41.72982084314337, 44.74620410987881], { icon: this.greenIcon }).bindPopup('Third Pin')
  ];


  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
    this.addMarkers();
  }

  ngOnDestroy() {
    this.map?.clearAllEventListeners;
    this.map?.remove();
  };

  addMarkers() {
    this.http.get<any[]>('/assets/wc.json').subscribe(data => {

      data.forEach(marker => {
        L.marker(
          [marker.lat, marker.lng],
          { icon: this.greenIcon })
          .bindPopup(marker.description)
          .addTo(this.map!);
      });
    })
  }
}