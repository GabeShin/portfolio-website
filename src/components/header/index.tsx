"use client";

import * as React from "react";
import BackdropImage from "./backdrop-image";
import Profile from "./profile";
import NavigationBar from "./navigation";

export default function Header() {
  return (
    <div>
      <BackdropImage />
      <Profile />
      <NavigationBar />
    </div>
  );
}
