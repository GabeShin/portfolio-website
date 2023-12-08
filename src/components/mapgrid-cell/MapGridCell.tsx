"use client";

import "./map.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import OnGridButton from "../button/OnGridButton";
import { useTheme } from "next-themes";

type PropsType = {};

export default function MapGridCell({}: PropsType) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map>();
  const { theme } = useTheme();

  const BerlinLocation: [number, number] = [
    13.441667543597818, 52.4691916188504,
  ];
  const [location, setLocation] = useState<[number, number]>(BerlinLocation);

  const moveCenterToMe = () => {
    setLocation(BerlinLocation);
  };

  useEffect(() => {
    const map = tt.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current as unknown as HTMLElement,
      center: location,
      zoom: 12,
    });

    // TODO: add custom marker
    map.on("load", () => {
      const popup = new tt.Popup({
        className: "popup",
        closeButton: false,
        anchor: "top",
      }).setHTML("<p>I'm in Berlin now!</p>");

      const marker = new tt.Marker().setLngLat(location).setPopup(popup);
      marker.addTo(map);
    });

    if (theme === "light" || theme === "retro") {
      map.setStyle({
        poi: "2/poi_light",
        map: "2/basic_street-light",
        trafficFlow: "flow_relative0",
        trafficIncidents: "incidents_day",
      });
    } else if (theme === "dark" || theme === "neon") {
      map.setStyle({
        poi: "2/poi_dark",
        map: "2/basic_street-dark",
        trafficFlow: "flow_relative0-dark",
        trafficIncidents: "incidents_night",
      });
    }

    setMap(map);

    return () => map.remove();
  }, [location, theme]);

  return (
    <div className="grid-cell relative h-full w-full overflow-hidden">
      <div ref={mapRef} className="h-full w-full" />
      <div className="absolute bottom-2 left-2 rounded-3xl">
        <OnGridButton text="To me!" onClick={moveCenterToMe} />
      </div>
    </div>
  );
}
