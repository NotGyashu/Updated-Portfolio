import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sections } from "../info";


function Header() {
const [nav, setNav] = useState(false);
const [isXClicked, setIsXClicked] = useState(false);


const toggleNav = () => {
setNav(!nav);
};


const handleXClick = () => {
setIsXClicked(true);
setTimeout(() => {
setIsXClicked(false);
setNav(false);
}, 1000);
};
 
return (
<div className="flex border no-scrollbar max-h-[99vh] justify-between items-center py-2 px-3 sm:py-3 sm:px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 z-20 box-border relative">
{/* Logo - Responsive Font Sizing */}
<div className="text-[#040404] dancing-font text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold whitespace-nowrap">
<span>&lt;</span>
<span className=""> gyashurahman </span>
<span>/&gt;</span>
</div>


{/* Hamburger Icon - Responsive Sizing */}
<div className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 cursor-pointer flex-shrink-0">
<img 
src="/hamburger.png" 
alt="menu icon" 
onClick={toggleNav}
className="w-full h-full object-contain"
/>
</div>


{/* Animated Navigation Menu */}
<AnimatePresence>
{nav && (
<motion.div
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
transition={{ duration: 0.6, ease: "easeInOut" }}
className="z-10 h-[99vh] box-border overflow-hidden flex flex-col rounded-tl-[10%] rounded-bl-[10%] sm:rounded-tl-[12%] sm:rounded-bl-[12%] md:rounded-tl-[15%] md:rounded-bl-[15%] lg:rounded-tl-[20%] lg:rounded-bl-[20%] px-[4%] py-[3%] sm:px-[4%] sm:py-[2.5%] md:px-[3.5%] md:py-[2%] lg:px-[3%] lg:py-[2%] w-[85%] xs:w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl Panchang-font border-2 absolute top-0 right-0 bg-white shadow-2xl"
>
{/* Close Button */}
<motion.img
src="/letter-x.png"
alt="close icon"
onClick={handleXClick}
className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 cursor-pointer p-2 mb-2 sm:mb-3 md:mb-4 lg:mb-5 rounded-full self-end"
animate={{
backgroundColor: isXClicked ? "#ffffed" : "#ffffff",
}}
transition={{ duration: 0.6 }}
/>


{/* Navigation Links */}
<motion.ul className="flex flex-col flex-grow justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
{Sections.map((section, index) => (
<motion.li
key={section.link || index}
initial={{ x: "100%", opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: "100%", opacity: 0 }}
transition={{ 
duration: 0.8, 
delay: index * 0.1,
ease: "easeOut" 
}}
className="flex items-center hover:translate-x-2 transition-transform duration-300"
>
<Link 
to={section.link} 
onClick={toggleNav}
className="w-full py-2 sm:py-3 md:py-4 hover:text-gray-600 transition-colors duration-300"
>
{section.name}
</Link>
</motion.li>
))}
</motion.ul>
</motion.div>
)}
</AnimatePresence>
</div>
);
}


export default Header;

