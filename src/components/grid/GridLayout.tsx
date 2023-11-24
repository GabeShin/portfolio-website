"use client";
import "./placeholder.css";

import { useState } from "react";
import {
  ItemCallback,
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";
import { layouts } from "./layouts";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridComponent() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleDragStart: ItemCallback = (layout, oldItem, newItem) => {
    setSelectedKey(newItem.i);
  };

  const handleDragStop: ItemCallback = () => {
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
