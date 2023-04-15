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

  constructor() {
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
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  markers: L.Marker[] = [
    L.marker([41.730811, 44.779581], {icon: this.greenIcon}).bindPopup('First Pin'),
    L.marker([41.7261055606886, 44.74963733728571], {icon: this.greenIcon}).bindPopup('Second Pin'),
    L.marker([41.72982084314337, 44.74620410987881], {icon: this.greenIcon}).bindPopup('Third Pin')
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
    this.markers.forEach(marker => {
      marker.addTo(this.map!);
    });
  }
}