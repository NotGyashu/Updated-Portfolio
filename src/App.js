import React, { useState } from "react";
import "./index.css";
import Name from "./components/Name";
import Preloader from "./components/Preloader";
import ThemeContext from "./contexts/themeContext";
import Projects from "./components/projects";
import Skills from "./components/skill";
import { Contact } from "./components/contact";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [preloader, setPreloader] = useState(true);

  const handlePreloaderHide = () => {
    setPreloader(false);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="">
        {preloader ? (
          <Preloader
            onPreloaderHide={handlePreloaderHide}
            preloader={preloader}
            setPreloader={setPreloader}
          />
        ) : (
          <div className="overflow-y-scroll overflow-hidden flex flex-col box-border no-scrollbar">
            <Name />
            <Projects />
            <Skills />
          </div>
        )}
        <Contact />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
