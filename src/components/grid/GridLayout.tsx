"use client";
import "./grid-layout.css";
import { useEffect, useState } from "react";
import { ItemCallback, Responsive, WidthProvider } from "react-grid-layout";
import { layouts } from "./layouts";
import useWindowSize from "@/app/hooks/on-window-size";
import ThemeGridCell from "../theme-cell/ThemeGridCell";
import { motion } from "framer-motion";
import InstaGridCell from "../instagram-cell/InstaGridCell";
import LinkedInGridCell from "../linkedin-cell/LinkedInGridCell";
import AboutMeGridCell from "../aboutme-cell/AboutMeGridCell";
import ProfileGridCell from "@/app/profile-cell/ProfileGridCell";
import ChatGridCell from "../chat-cell/ChatGridCell";

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
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0, 1],
        translateY: [20, 0],
      }}
      transition={{ delay: 0.5 }}
    >
      <ResponsiveGridLayout
        className="grid-container max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1200px]"
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
          className={`${
            selectedKey === "profile" ? "selected-grid-cell" : ""
          }]`}
          key="profile"
        >
          <ProfileGridCell />
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
          className={`${
            selectedKey === "linkedin" ? "selected-grid-cell" : ""
          } `}
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
    </motion.div>
  );
}
