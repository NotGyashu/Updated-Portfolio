import React, { useEffect, useRef } from "react";
import Matter, {
  Engine,
  Render,
  Bodies,
  World,
  Events,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { about } from "../info";

const BallPool = ({ dimensions }) => {
  const cw = dimensions.width;
  const ch = dimensions.height;
  const scene = useRef();
  const engine = useRef(
    Engine.create({
      gravity: {
        x: 0, // horizontal gravity
        y: 0.5, // Vertical gravity (adjust as needed)
      },
    })
  );
  let radius; // Declare radius variable outside the if-else block

  // Adjusted original radius
  useEffect(() => {
    if (cw > 800) {
      radius = cw / 20; // Adjusted original radius
    } else {
      radius = cw / 18;
    }

    // Now you can use radius appropriately
    //console.log("Current radius:", radius);
  }, [cw, dimensions]); // Ensure cw is included in dependencies if it's used inside the effect

  useEffect(() => {
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

    // boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -radius, cw + 2 * radius, 2 * radius, {
        isStatic: true,
        render: {
          visible: false, // Make top boundary invisible
        },
      }), // top
      Bodies.rectangle(-radius, ch / 2, 2 * radius, ch + 2 * radius, {
        isStatic: true,
        render: {
          visible: false, // Make top boundary invisible
        },
      }), // left
      Bodies.rectangle(cw / 2, ch + radius, cw + 2 * radius, 2 * radius, {
        isStatic: true,
        render: {
          visible: false, // Make top boundary invisible
        },
      }), // bottom
      Bodies.rectangle(cw + radius, ch / 2, 2 * radius, ch + 2 * radius, {
        isStatic: true,
        render: {
          visible: false, // Make top boundary invisible
        },
      }), // right
    ]);

    // Add mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8, // stiffness of the constraint
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.current.world, mouseConstraint);
    // run the engine
    Matter.Runner.run(engine.current);
    Render.run(render);

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      if (true) {
        setTimeout(() => {
          renderCircles(cw, ch);
        }, 2000);
      }
    }
  }, [dimensions]);

  const renderCircles = async (cw, ch) => {
    const clickedCircles = [];
    // Define a boundary collision handler
    const boundaryCollision = (event) => {
      const pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        // Check if the circle body collides with any of the boundaries
        if (bodyA.isCircle && (bodyB.isWall || bodyB.isBoundary)) {
          // Reverse the vertical velocity to prevent it from falling out of bounds
          bodyA.velocity.y *= -1;
        }
        if (bodyB.isCircle && (bodyA.isWall || bodyA.isBoundary)) {
          // Reverse the vertical velocity to prevent it from falling out of bounds
          bodyB.velocity.y *= -1;
        }
      }
    };

    // Add the boundary collision handler to the collision event
    Events.on(engine.current, "collisionStart", boundaryCollision);

    for (let i = 0; i < about.skills.length; i++) {
      const skill = about.skills[i];
      const delay = Math.random() * 600;

      // Wait for the delay before rendering the circle
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Calculate random position considering boundaries and direction
      const randomX = Math.random() * 1000;
      const randomY = Math.random() * 0;

      // Generate a unique ID for each circle
      const circleId = `circle-${i}`;

      // Calculate random velocity vector
      const randomVelocityX = (Math.random() - 0.5) * 5; // Random velocity between -2.5 and 2.5
      const randomVelocityY = (Math.random() - 0.5) * 5;
      //console.log(cw, ch);
      const circle = Bodies.circle(randomX, randomY, radius, {
        restitution: 1,
        friction: 0.1,
        velocity: { x: randomVelocityX, y: randomVelocityY },
        render: {
          fillStyle: "transparent",
          strokeStyle: "#dee2e6",
          lineWidth: 0.7,
        },
      });

      // Assign the circleId to the circle's custom property
      circle.circleId = circleId;

      // Add circle to the world
      World.add(engine.current.world, [circle]);
      Matter.Sleeping.set(circle, false); // Wake the circle if needed

      // Render text
      const textElement = document.createElement("div");
      const words = skill.split(" "); // Split text into words
      if (words.length === 2) {
        // If there are two words, display them in two lines
        textElement.innerHTML = `${words[0]}<br>${words[1]}`;
      } else {
        textElement.innerHTML = skill;
      }
      textElement.style.position = "absolute";
      textElement.style.left = `${randomX}px`;
      textElement.style.top = `${randomY}px`;
      textElement.style.color = "#ffffff";
      textElement.style.fontSize = "14px";
      textElement.style.textAlign = "center";
      textElement.style.transform = "translate(-50%, -50%)";
      textElement.style.fontFamily = "panchanag";
      scene.current?.appendChild(textElement);

      const updateTextPosition = () => {
        const circlePosition = circle.position;
        textElement.style.left = `${circlePosition.x}px`;
        textElement.style.top = `${circlePosition.y}px`;
      };
      // Subscribe to position updates
      Events.on(engine.current, "afterUpdate", updateTextPosition);
    }

    // Add click event listener to the scene's canvas

    function handleEvent(event) {
      event.preventDefault();
      const mousePosition = {
        x: event.offsetX || event.touches[0].clientX,
        y: event.offsetY || event.touches[0].clientY,
      };

      console.log("Mouse Position:", mousePosition);

      // Check if any body contains the clicked point
      const bodies = Matter.Query.point(
        engine.current.world.bodies,
        mousePosition
      );

      console.log("Bodies:", bodies);

      // If a body is clicked, double its size
      if (bodies.length > 0) {
        const clickedBody = bodies[0];
        const circleId = clickedBody.circleId; // Retrieve circleId here
        console.log("Clicked Body:", clickedBody);
        console.log("Circle ID:", circleId);

        // Check if the circleId is already in clickedCircles array
        const size = clickedCircles.includes(circleId);
        console.log(size);

        // If circleId is not in clickedCircles array, push it and scale the body
        if (!size) {
          clickedCircles.push(circleId);
          console.log(clickedCircles);
          const scaleFactor = 1.2 + Math.random() * 0.4;
          Matter.Body.scale(clickedBody, scaleFactor, scaleFactor);
        }
      }
    }

    scene.current?.addEventListener("click", handleEvent);
    scene.current?.addEventListener("touchstart", handleEvent);

    return () => {
      // Cleanup event listeners
      scene.current.removeEventListener("click", handleEvent);
      scene.current.removeEventListener("touchstart", handleEvent);
    };
  };

  return (
    <div
      ref={scene}
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
};

export  {BallPool};
