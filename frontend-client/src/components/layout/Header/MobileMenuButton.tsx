"use client";

import {useState} from "react";

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {

    if (typeof document !== "undefined") {
      const menu = document.querySelector("header .right-side");
      if (menu) {
        setIsOpen(!isOpen);
        menu.classList.toggle("active");
      }
    }
  }

  return (
      <div className={`menu-btn ${isOpen ? 'active' : ''}`} onClick={handleClick}>
        <span></span>
      </div>
  );
}