import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
      <Router>
        
       
          <div className="">
            {preloader ? (
              <Preloader
                onPreloaderHide={handlePreloaderHide}
                preloader={preloader}
                setPreloader={setPreloader}
              />
            ) : (
              <div className="flex flex-col box-border no-scrollbar">
                <AnimatedRoutes />
              </div>
            )}
          </div>
        
      </Router>
    </ThemeContext.Provider>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Name />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
