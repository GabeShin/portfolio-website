"use client";
import { useState } from "react";
import {
  ItemCallback,
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridComponent() {
  const mdLayout: Layout[] = [
    { i: "profile", x: 0, y: 0, w: 2, h: 2 },
    { i: "google-map", x: 2, y: 0, w: 1, h: 1 },
    { i: "seeso-sdk", x: 3, y: 0, w: 1, h: 2 },
    { i: "seeso-labs", x: 2, y: 1, w: 1, h: 2 },
    { i: "theme-toggle", x: 3, y: 2, w: 1, h: 1 },
    { i: "instagram", x: 1, y: 1, w: 1, h: 1 },
    { i: "linkedin", x: 0, y: 1, w: 1, h: 1 },
    { i: "aboutme", x: 0, y: 3, w: 2, h: 1 },
    { i: "chat", x: 2, y: 3, w: 2, h: 1 },
  ];

  const smLayout: Layout[] = [
    { i: "profile", x: 0, y: 0, w: 2, h: 2 },
    { i: "google-map", x: 2, y: 0, w: 1, h: 1 },
    { i: "seeso-sdk", x: 2, y: 1, w: 1, h: 2 },
    { i: "seeso-labs", x: 1, y: 3, w: 1, h: 2 },
    { i: "theme-toggle", x: 2, y: 3, w: 1, h: 1 },
    { i: "instagram", x: 0, y: 1, w: 1, h: 1 },
    { i: "linkedin", x: 0, y: 2, w: 1, h: 1 },
    { i: "aboutme", x: 0, y: 4, w: 2, h: 1 },
    { i: "chat", x: 3, y: 4, w: 1, h: 1 },
  ];

  const xxsLayout: Layout[] = [
    { i: "profile", x: 0, y: 0, w: 2, h: 2 },
    { i: "google-map", x: 1, y: 2, w: 1, h: 1 },
    { i: "seeso-sdk", x: 0, y: 2, w: 1, h: 2 },
    { i: "seeso-labs", x: 1, y: 3, w: 1, h: 2 },
    { i: "theme-toggle", x: 0, y: 4, w: 1, h: 1 },
    { i: "instagram", x: 1, y: 6, w: 1, h: 1 },
    { i: "linkedin", x: 0, y: 6, w: 1, h: 1 },
    { i: "aboutme", x: 0, y: 5, w: 2, h: 1 },
    { i: "chat", x: 0, y: 7, w: 2, h: 1 },
  ];

  const layouts = {
    md: mdLayout,
    sm: smLayout,
    xxs: xxsLayout,
  };

  const [selectedKey, setSelectedKey] = useState(null);

  const handleDragStart = (layout, oldItem, newItem) => {
    setSelectedKey(newItem.i);
    console.log(newItem.i);
  };

  const handleDragStop = () => {
    console.log("handleDragStop");
    setSelectedKey(null);
  };

  return (
    <ResponsiveGridLayout
      className="mx-auto mb-5 max-w-[400px] md:max-w-[800px] lg:max-w-[1200px]"
      layouts={layouts}
      breakpoints={{ md: 1024, sm: 768, xxs: 0 }}
      cols={{ md: 4, sm: 3, xxs: 2 }}
      rowHeight={150}
      width={150}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
    >
      <div
        className={`grid-cell ${
          selectedKey === "profile" ? "selected-grid-cell" : ""
        }`}
        key="profile"
      >
        profile
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "google-map" ? "selected-grid-cell" : ""
        }`}
        key="google-map"
      >
        google map
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "seeso-sdk" ? "selected-grid-cell" : ""
        }`}
        key="seeso-sdk"
      >
        seeso sdk
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "seeso-labs" ? "selected-grid-cell" : ""
        }`}
        key="seeso-labs"
      >
        seesolabs
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "theme-toggle" ? "selected-grid-cell" : ""
        }`}
        key="theme-toggle"
      >
        theme toggle
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "instagram" ? "selected-grid-cell" : ""
        }`}
        key="instagram"
      >
        instagram
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "linkedin" ? "selected-grid-cell" : ""
        }`}
        key="linkedin"
      >
        linkedin
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "aboutme" ? "selected-grid-cell" : ""
        }`}
        key="aboutme"
      >
        about me
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "chat" ? "selected-grid-cell" : ""
        }`}
        key="chat"
      >
        chat
      </div>
    </ResponsiveGridLayout>
  );
}
