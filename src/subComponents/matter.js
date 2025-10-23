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
  Runner,
} from "matter-js";
import { about } from "../info";

const BallPool = ({ dimensions }) => {
  const cw = dimensions.width;
  const ch = dimensions.height;
  const scene = useRef();
  const engine = useRef(Engine.create({ gravity: { x: 0, y: 0.5 } }));
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const textElementsRef = useRef([]);
  const isInitialized = useRef(false);

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
    const wallThickness = maxRadius * 4; // Make walls thicker to prevent tunneling
    
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -wallThickness / 2, cw + 2 * wallThickness, wallThickness, {
        isStatic: true,
        render: { visible: false },
        slop: 0.5, // Helps with collision accuracy
      }),
      Bodies.rectangle(-wallThickness / 2, ch / 2, wallThickness, ch + 2 * wallThickness, {
        isStatic: true,
        render: { visible: false },
        slop: 0.5,
      }),
      Bodies.rectangle(cw / 2, ch + wallThickness / 2, cw + 2 * wallThickness, wallThickness, {
        isStatic: true,
        render: { visible: false },
        slop: 0.5,
      }),
      Bodies.rectangle(cw + wallThickness / 2, ch / 2, wallThickness, ch + 2 * wallThickness, {
        isStatic: true,
        render: { visible: false },
        slop: 0.5,
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

    // Use Runner with smaller delta for better accuracy
    const runner = Runner.create({
      delta: 1000 / 60,
      isFixed: true,
    });
    runnerRef.current = runner;
    Runner.run(runner, engine.current);
    Render.run(render);

    // Add boundary check to prevent tunneling
    Events.on(engine.current, 'afterUpdate', function() {
      const bodies = engine.current.world.bodies;
      const maxVelocity = 20; // Maximum velocity limit

      bodies.forEach(body => {
        if (!body.isStatic) {
          // Clamp velocity to prevent excessive speeds
          if (body.velocity.x > maxVelocity) {
            Body.setVelocity(body, { x: maxVelocity, y: body.velocity.y });
          }
          if (body.velocity.x < -maxVelocity) {
            Body.setVelocity(body, { x: -maxVelocity, y: body.velocity.y });
          }
          if (body.velocity.y > maxVelocity) {
            Body.setVelocity(body, { x: body.velocity.x, y: maxVelocity });
          }
          if (body.velocity.y < -maxVelocity) {
            Body.setVelocity(body, { x: body.velocity.x, y: -maxVelocity });
          }

          // Check if body escaped bounds and bring it back
          const padding = 10;
          if (body.position.x < padding) {
            Body.setPosition(body, { x: padding, y: body.position.y });
            Body.setVelocity(body, { x: Math.abs(body.velocity.x) * 0.8, y: body.velocity.y });
          }
          if (body.position.x > cw - padding) {
            Body.setPosition(body, { x: cw - padding, y: body.position.y });
            Body.setVelocity(body, { x: -Math.abs(body.velocity.x) * 0.8, y: body.velocity.y });
          }
          if (body.position.y < padding) {
            Body.setPosition(body, { x: body.position.x, y: padding });
            Body.setVelocity(body, { x: body.velocity.x, y: Math.abs(body.velocity.y) * 0.8 });
          }
          if (body.position.y > ch - padding) {
            Body.setPosition(body, { x: body.position.x, y: ch - padding });
            Body.setVelocity(body, { x: body.velocity.x, y: -Math.abs(body.velocity.y) * 0.8 });
          }
        }
      });
    });

    const timeoutId = setTimeout(() => {
      renderCircles(cw, ch);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      
      textElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      textElementsRef.current = [];

      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }

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
        restitution: 0.8, // Reduced from 0.9 for more stable collisions
        friction: 0.1,
        frictionAir: 0.01, // Added air friction to slow down over time
        density: 0.001 * importance,
        velocity: { x: randomVelocityX, y: randomVelocityY },
        slop: 0.5, // Helps with collision accuracy
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
      textElementsRef.current.push(textElement);

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
