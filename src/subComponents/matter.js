import React, { useEffect, useRef } from "react";
import Matter, {
  Engine,
  Render,
  Bodies,
  World,
  Events,
  Mouse,
  MouseConstraint,
  Body,
} from "matter-js";
import { about } from "../info";

const BallPool = ({ dimensions }) => {
  const cw = dimensions.width;
  const ch = dimensions.height;
  const scene = useRef();
  const engine = useRef(Engine.create({ gravity: { x: 0, y: 0.5 } }));
  const renderRef = useRef(null);
  const textElementsRef = useRef([]); // Track all text elements
  const isInitialized = useRef(false); // Prevent double initialization

  const getBaseRadius = () => {
    if (cw >= 1024) return cw / 25;
    else if (cw >= 768) return cw / 20;
    else if (cw >= 480) return cw / 16;
    else return cw / 14;
  };

  const getRadiusForImportance = (importance) => {
    const baseRadius = getBaseRadius();
    const scaleFactor = 0.6 + (importance - 1) * 0.2;
    return baseRadius * scaleFactor;
  };

  const getFontSizeForImportance = (importance) => {
    let baseFontSize;
    if (cw >= 1024) baseFontSize = 14;
    else if (cw >= 768) baseFontSize = 12;
    else if (cw >= 480) baseFontSize = 10;
    else baseFontSize = 9;
    
    const fontScaleFactor = 0.7 + (importance - 1) * 0.125;
    return `${Math.round(baseFontSize * fontScaleFactor)}px`;
  };

  useEffect(() => {
    if (!cw || !ch || isInitialized.current) return;

    isInitialized.current = true;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    renderRef.current = render;

    const maxRadius = getRadiusForImportance(5);
    
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -maxRadius, cw + 2 * maxRadius, 2 * maxRadius, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(-maxRadius, ch / 2, 2 * maxRadius, ch + 2 * maxRadius, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(cw / 2, ch + maxRadius, cw + 2 * maxRadius, 2 * maxRadius, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(cw + maxRadius, ch / 2, 2 * maxRadius, ch + 2 * maxRadius, {
        isStatic: true,
        render: { visible: false },
      }),
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: { visible: false },
      },
    });

    World.add(engine.current.world, mouseConstraint);
    Matter.Runner.run(engine.current);
    Render.run(render);

    // Start rendering circles after a delay
    const timeoutId = setTimeout(() => {
      renderCircles(cw, ch);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      
      // Remove all text elements from DOM
      textElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      textElementsRef.current = [];

      // Clean up Matter.js
      if (renderRef.current) {
        Render.stop(renderRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
        renderRef.current.canvas = null;
        renderRef.current.context = null;
        renderRef.current.textures = {};
      }

      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      
      isInitialized.current = false;
    };
  }, [cw, ch]);

  const renderCircles = async (cw, ch) => {
    const clickedCircles = [];
    
    const boundaryCollision = (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        if (bodyA.isCircle && (bodyB.isWall || bodyB.isBoundary)) {
          bodyA.velocity.y *= -1;
        }
        if (bodyB.isCircle && (bodyA.isWall || bodyA.isBoundary)) {
          bodyB.velocity.y *= -1;
        }
      }
    };

    Events.on(engine.current, "collisionStart", boundaryCollision);

    for (let i = 0; i < about.skills.length; i++) {
      const skill = about.skills[i];
      const skillName = typeof skill === 'string' ? skill : skill.name;
      const importance = typeof skill === 'string' ? 3 : skill.importance;
      
      const radius = getRadiusForImportance(importance);
      const fontSize = getFontSizeForImportance(importance);
      const delay = Math.random() * 600;

      await new Promise((resolve) => setTimeout(resolve, delay));

      const randomX = Math.random() * (cw - 2 * radius) + radius;
      const randomY = Math.random() * 100;
      const circleId = `circle-${i}`;

      const randomVelocityX = (Math.random() - 0.5) * 5;
      const randomVelocityY = (Math.random() - 0.5) * 5;

      const circle = Bodies.circle(randomX, randomY, radius, {
        restitution: 0.9,
        friction: 0.1,
        density: 0.001 * importance,
        velocity: { x: randomVelocityX, y: randomVelocityY },
        render: {
          fillStyle: "transparent",
          strokeStyle: "#dee2e6",
          lineWidth: 0.7,
        },
      });

      circle.circleId = circleId;
      circle.importance = importance;
      World.add(engine.current.world, [circle]);
      Matter.Sleeping.set(circle, false);

      const textElement = document.createElement("div");
      const words = skillName.split(" ");
      if (words.length === 2) {
        textElement.innerHTML = `${words[0]}<br>${words[1]}`;
      } else {
        textElement.innerHTML = skillName;
      }
      textElement.style.position = "absolute";
      textElement.style.left = `${randomX}px`;
      textElement.style.top = `${randomY}px`;
      textElement.style.color = "#ffffff";
      textElement.style.fontSize = fontSize;
      textElement.style.textAlign = "center";
      textElement.style.transform = "translate(-50%, -50%)";
      textElement.style.fontFamily = "panchanag";
      textElement.style.pointerEvents = "none";
      textElement.style.userSelect = "none";
      textElement.style.lineHeight = "1.2";
      textElement.style.fontWeight = importance >= 4 ? "600" : "400";
      
      scene.current?.appendChild(textElement);
      textElementsRef.current.push(textElement); // Track text element

      const updateTextPosition = () => {
        const circlePosition = circle.position;
        textElement.style.left = `${circlePosition.x}px`;
        textElement.style.top = `${circlePosition.y}px`;
      };

      Events.on(engine.current, "afterUpdate", updateTextPosition);
    }

    function handleEvent(event) {
      event.preventDefault();
      const rect = scene.current?.getBoundingClientRect();
      if (!rect) return;
      
      const mousePosition = {
        x: (event.clientX || event.touches?.[0]?.clientX) - rect.left,
        y: (event.clientY || event.touches?.[0]?.clientY) - rect.top,
      };

      const bodies = Matter.Query.point(
        engine.current.world.bodies,
        mousePosition
      );

      if (bodies.length > 0) {
        const clickedBody = bodies[0];
        const circleId = clickedBody.circleId;

        if (circleId && !clickedCircles.includes(circleId)) {
          clickedCircles.push(circleId);
          const scaleFactor = 1.2 + Math.random() * 0.3;
          Body.scale(clickedBody, scaleFactor, scaleFactor);
        }
      }
    }

    scene.current?.addEventListener("click", handleEvent);
    scene.current?.addEventListener("touchstart", handleEvent);
  };

  return (
    <div
      ref={scene}
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
};

export { BallPool };
