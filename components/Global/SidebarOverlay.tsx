"use client";

import { closeSidebar } from "@/redux/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

function SidebarOverlay() {
  const sidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`sidebar__overlay ${sidebarOpen && `sidebar__overlay--open`}`}
      onClick={() => dispatch(closeSidebar())}
    ></div>
  );
}

export default SidebarOverlay;
