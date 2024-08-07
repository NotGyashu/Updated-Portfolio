export const about = {
  name: "Gyashu Rahman",
  description: " —Full-Stack Developer & Web Designer with experience crafting user-friendly web experiences and tackling challenging algorithms.",

    // "I'm a passionate full-stack developer with a strong foundation in front-end and back-end technologies. I specialize in creating responsive web applications with intuitive interfaces and robust functionality. My expertise includes React.js, Node.js, and MongoDB, and I am proficient in integrating third-party services like Firebase and Socket.io. I am committed to delivering high-quality code and innovative solutions to enhance user experiences. I am seeking opportunities to leverage my skills and experience in a dynamic development environment.",
  skills: [
    "Javascript",
    "Typescript",
    "Python",
    "Node.js",
    "Express",
    "Tailwind",
    "Firebase",
    "Next.js",
    "React.js",
    "Redux",
    "jQuery",
    "Matter.Js",
    "Framer Motion",
    "MongoDB",
    "SQL",
  ],
  // 'HTML' , 'CSS','Javascript','Typescript','Python','Bootstrap','Node.js','Express','Tailwind','EJS','Firebase','Next.js','React.js','Redux','jQuery','Swiper.js','Mongoose','Framer Motion','MongoDB','SQL','C++','NLP','GenAI'
};

export const projects = [
  {
    name: "Social-Arena",
    src: "/Screenshot 2024-04-05 164820.png",
    description:
      "A responsive social media web app using React.js, MongoDB, and Node.js. This full-stack application featured secure user authentication with bcrypt, intuitive interfaces for post creation and sharing, and interactive features such as likes, comments, and real-time updates using Socket.io. Additionally, I integrated a real-time chat system and a follow functionality to enhance user connectivity. The project emphasized robust data security and user engagement through seamless interaction and profile management",
    Timeline: "Oct’23 - Dec’23",
    link: "https://social-arena.vercel.app/",
    code: "https://github.com/NotGyashu/Social-Arena",
  },
  {
    name: "chrome-assistant",
    src: "/Screenshot 2024-07-26 221725.png",
    description:
      "A Chrome extension using Manifest V3 and React.js, integrating Google GenAI and TensorFlow.js to create an In-Page AI Companion. The extension features real-time data scraping with Cheerio and Readability for in-depth webpage analysis and summarization. I implemented a context management system to enhance user prompts with embedded text, overcoming GenAI API limitations. Webpack 5 was used to optimize performance and ensure a smooth user experience with streaming responses",
    Timeline: "Jun’24 - Jul’24",
    link: "https://github.com/NotGyashu/Chrome-Assistant",
    code: "https://github.com/NotGyashu/Chrome-Assistant",
  },
  {
    name: "Admin - Dashboard",
    src: "/Screenshot 2024-04-05 164921.png",
    description:
      "An admin dashboard using React, HTML, CSS, and Tailwind CSS, integrated with Firebase for user registration and login. The dashboard included analytics features using Recharts to monitor revenue, earnings, and user balances. I designed intuitive interfaces for seamless product management, including creation, sharing, and interaction. User management functionalities allowed administrators to view, add, and manage users and products efficiently. The project focused on a modern, intuitive UI to streamline administrative tasks and enhance overall user experience.",
    Timeline: "Dec'23-Jan'24",
    link: "https://notgyashu.github.io/Admin-dashboard/",
    code: "https://github.com/NotGyashu/Admin-dashboard",
  },
  {
    name: "Anonymous - Thoughts ",
    src: "/Screenshot 2024-07-09 223342.png",
    description:
      "A responsive web app using React, HTML, CSS, Tailwind CSS, and Material UI, backed by MongoDB. The app serves as a personal note-keeping tool with CRUD operations for text notes and a voice notes feature using react-mic. Enhancements included emoji support for note creation and a secure lock system to protect user data, ensuring an improved user experience",
    Timeline: "July'23-Aug'23",
    link: "https://anonymus-thoughts-client.vercel.app/login",
    code: "https://github.com/NotGyashu/Anonymus-thoughts",
  },
  {
    name: "page-summarizer",
    src: "/Screenshot 2024-07-26 222143.png",
    description:
      "A Chrome extension called Page-Summarizer using Manifest V3 and Cohere AI. This extension summarizes webpage text in real-time, leveraging text chunking to efficiently handle lengthy content. The user interface, built with React, ensures a seamless experience. This tool helps users save time by quickly summarizing long documents, articles, and research papers.",
    Timeline: "Jun’24 - Jul’24",
    link: "https://github.com/NotGyashu/page-summarizer",
    code: "https://github.com/NotGyashu/page-summarizer",
  },
  {
    name: "stockTracker",
    src: "/Screenshot 2024-04-05 165438.png",
    description:
      "A web App which uses a REST API to fetch data and provides information about stocks including there name, price,gain or loss, parent company,countey,IPO,Market Capitalization previous trend from last year.",
    Timeline: "April'23-oct'23",
    link: "https://notgyashu.github.io/stockTracker/",
    code: "https://github.com/NotGyashu/stockTracker",
  },
];


export const social = [
  {
    src: "/mail.png",
    link: "mailto:rahmangyashu178@gmail.com",
  },
  {
    src: "/linkedin.png",
    link: "https://www.linkedin.com/in/gyashu-rahman-299627224/",
  },
  {
    src: "/social-media.png",
    link: "https://github.com/NotGyashu/",
  },
  {
    src: "/logo.png",
    link: "https://www.instagram.com/gyashu_rahman/",
  },
];

export const Sections = [
  {
    name:"Home",
    link:"/",
  },
  {
    name:"Projects",
    link:"/projects",
  },
  {
    name:"Skills",
    link:"/skills",
  },
  {
    name:"Contact",
    link:"/contact",
  }
];
