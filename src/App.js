import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Name from "./components/Name";
import Preloader from "./components/Preloader";
import ThemeContext from "./contexts/themeContext";
import Projects from "./components/projects";
import Skills from "./components/skill";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="overflow-y-scroll overflow-hidden flex flex-col box-border no-scrollbar">
        {/* <Preloader />
        <Name />
        <Projects /> */}
        <Skills/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
