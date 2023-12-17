"use client";

import "./grid-layout.css";
import { layouts } from "./layouts";
import AboutMeGridCell from "@/components/aboutme-cell/AboutMeGridCell";
import ChatGridCell from "@/components/chat-cell/ChatGridCell";
import useWindowSize from "@/components/hooks/on-window-size";
import InstaGridCell from "@/components/instagram-cell/InstaGridCell";
import LinkedInGridCell from "@/components/linkedin-cell/LinkedInGridCell";
import ProfileGridCell from "@/components/profile-cell/ProfileGridCell";
import SeesoLabsGridCell from "@/components/seesolabs-cell/SeesoLabsGridCell";
import SeesoSDKGridCell from "@/components/seesosdk-cell/SeesoSDKGridCell";
import ThemeGridCell from "@/components/theme-cell/ThemeGridCell";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ItemCallback, Responsive, WidthProvider } from "react-grid-layout";

const MapGridCell = dynamic(() => import("../mapgrid-cell/MapGridCell"), {
  ssr: false,
});

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridComponent() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [rowHeight, setRowHeight] = useState(200);
  const windowSize = useWindowSize();

  const handleDragStart: ItemCallback = (layout, oldItem, newItem) => {
    setSelectedKey(newItem.i);
  };

  const handleDragStop: ItemCallback = () => {
    setSelectedKey(null);
  };

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector(".grid-container");
      if (container instanceof HTMLElement) {
        const containerWidth = container.offsetWidth;

        if (containerWidth >= 1200) {
          setRowHeight(300);
        } else {
          setRowHeight(200);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return (
    <ResponsiveGridLayout
      className="grid-container m-auto max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1200px]"
      layouts={layouts}
      breakpoints={{ xl: 1199, lg: 799, md: 599, xxs: 0 }}
      cols={{ xl: 4, lg: 4, md: 3, xxs: 2 }}
      margin={[16, 16]}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      rowHeight={rowHeight}
      draggableCancel=".clickable-button"
    >
      <div
        className={`${selectedKey === "profile" ? "selected-grid-cell" : ""}]`}
        key="profile"
      >
        <ProfileGridCell />
      </div>
      <div
        className={`${
          selectedKey === "google-map" ? "selected-grid-cell" : ""
        }`}
        key="google-map"
      >
        <MapGridCell />
      </div>
      <div
        className={` ${
          selectedKey === "seeso-sdk" ? "selected-grid-cell" : ""
        } `}
        key="seeso-sdk"
      >
        <SeesoSDKGridCell />
      </div>
      <div
        className={`${
          selectedKey === "seeso-labs" ? "selected-grid-cell" : ""
        }`}
        key="seeso-labs"
      >
        <SeesoLabsGridCell />
      </div>
      <div
        className={`${
          selectedKey === "theme-toggle" ? "selected-grid-cell" : ""
        }`}
        key="theme-toggle"
      >
        <ThemeGridCell />
      </div>
      <div
        className={`${
          selectedKey === "instagram" ? "selected-grid-cell" : ""
        } `}
        key="instagram"
      >
        <InstaGridCell />
      </div>
      <div
        className={`${selectedKey === "linkedin" ? "selected-grid-cell" : ""} `}
        key="linkedin"
      >
        <LinkedInGridCell />
      </div>
      <div
        className={`${selectedKey === "aboutme" ? "selected-grid-cell" : ""}`}
        key="aboutme"
      >
        <AboutMeGridCell />
      </div>
      <div
        className={`${selectedKey === "chat" ? "selected-grid-cell" : ""} `}
        key="chat"
      >
        <ChatGridCell />
      </div>
    </ResponsiveGridLayout>
  );
}
