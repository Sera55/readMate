"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// İkon hatasını düzeltmek için
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  isSelector?: boolean;
}

export default function MapUI({ onLocationSelect, isSelector = false }: MapProps) {
  const [position, setPosition] = useState<[number, number]>([41.0082, 28.9784]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        if (isSelector) {
          setPosition([e.latlng.lat, e.latlng.lng]);
          onLocationSelect?.(e.latlng.lat, e.latlng.lng);
        }
      },
    });

    return position ? <Marker position={position} icon={icon} /> : null;
  }

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}