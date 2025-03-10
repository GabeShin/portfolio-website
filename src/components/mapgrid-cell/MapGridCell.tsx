"use client";

import "./map.css";
import OnGridButton from "@/components/button/OnGridButton";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type PropsType = {};

export default function MapGridCell({}: PropsType) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<tt.Map>();
  const { theme } = useTheme();

  const HomeLocation: [number, number] = [127, 37.5];
  const [location, setLocation] = useState<[number, number]>(HomeLocation);

  const moveCenterToMe = () => {
    setLocation(HomeLocation);
  };

  useEffect(() => {
    const map = tt.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current as unknown as HTMLElement,
      center: location,
      zoom: 10,
    });

    // TODO: add custom marker
    map.on("load", () => {
      const popup = new tt.Popup({
        className: "popup",
        closeButton: false,
        anchor: "top",
      }).setHTML("<p>I'm in Seoul now!</p>");

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
        <OnGridButton text="Go to me!" onClick={moveCenterToMe} />
      </div>
    </div>
  );
}
