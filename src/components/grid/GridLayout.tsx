"use client";
import "./grid-layout.css";

import { useEffect, useState } from "react";
import { ItemCallback, Responsive, WidthProvider } from "react-grid-layout";
import { layouts } from "./layouts";
import useWindowSize from "@/app/hooks/on-window-size";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function GridComponent() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleDragStart: ItemCallback = (layout, oldItem, newItem) => {
    setSelectedKey(newItem.i);
  };

  const handleDragStop: ItemCallback = () => {
    setSelectedKey(null);
  };

  const [rowHeight, setRowHeight] = useState(200); // Initial row height
  const windowSize = useWindowSize();

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector(".grid-container");
      if (container instanceof HTMLElement) {
        const containerWidth = container.offsetWidth;

        if (containerWidth >= 1200) {
          setRowHeight(300);
          return;
        } else {
          setRowHeight(200);
        }
      }
    };
    handleResize();
    // todo: Issue with resizing height when window size is bigger than 1200px
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return (
    <ResponsiveGridLayout
      className="transition-a grid-container mx-auto max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1200px]"
      layouts={layouts}
      breakpoints={{ xl: 1199, lg: 799, md: 599, xxs: 0 }}
      cols={{ xl: 4, lg: 4, md: 3, xxs: 2 }}
      margin={[16, 16]}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      rowHeight={rowHeight}
    >
      <div
        className={`grid-cell ${
          selectedKey === "profile" ? "selected-grid-cell" : ""
        } h-[200px] w-[200px]`}
        style={{ height: 200, width: 200 }}
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
        } seeso-sdk-theme`}
        key="seeso-sdk"
      >
        seeso sdk
      </div>
      <div
        className={`grid-cell ${
          selectedKey === "seeso-labs" ? "selected-grid-cell" : ""
        } seesolabs-theme `}
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
        } instagram-theme`}
        key="instagram"
      ></div>
      <div
        className={`grid-cell ${
          selectedKey === "linkedin" ? "selected-grid-cell" : ""
        } linkedin-theme`}
        key="linkedin"
      ></div>
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
        } chatgpt-theme`}
        key="chat"
      ></div>
    </ResponsiveGridLayout>
  );
}
