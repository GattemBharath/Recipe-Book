import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import "./themeselector.css";
import sun from "../assets/sun.svg";
import dark from "../assets/dark.svg";

const themeColors = ["#58249c", "#249c6b", "#f218e7"];

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();
  const [image, setImage] = useState(sun);

  const toggleMode = () => {
    if (mode === "light") {
      changeMode("dark");
      setImage(dark);
    } else {
      changeMode("light");
      setImage(sun);
    }
  };
  // console.log(mode);

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={image}
          alt="light/dark-mode"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
