"use client";

import "./map.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";

type PropsType = {};

export default function MapGridCell({}: PropsType) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map>();

  useEffect(() => {
    const myLocation: [number, number] = [13.441667543597818, 52.4691916188504];
    const map = tt.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current as unknown as HTMLElement,
      center: myLocation,
      zoom: 10,
    });

    // TODO: add custom marker
    map.on("load", () => {
      const popup = new tt.Popup({
        className: "popup",
        closeButton: false,
        anchor: "top",
      }).setHTML("<p>I'm in Berlin now!</p>");

      const marker = new tt.Marker().setLngLat(myLocation).setPopup(popup);
      marker.addTo(map);
    });

    setMap(map);

    return () => map.remove();
  }, []);

  return <div ref={mapRef} className="h-full w-full"></div>;
}
