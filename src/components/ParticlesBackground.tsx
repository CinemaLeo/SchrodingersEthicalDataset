import React, { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from "./config/particlesConfig"; // Import the config

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicConfig = useMemo(() => {
    const area = viewport.width * viewport.height;
    const minArea = 375 * 667;
    const maxArea = 1920 * 1080;
    const ratio = clamp((area - minArea) / (maxArea - minArea), 0, 1);

    const particleCount = clamp(Math.round(40 + ratio * 210), 40, 250);
    const minSize = clamp(Math.round(8 + ratio * 14), 8, 22);
    const maxSize = clamp(Math.round(14 + ratio * 22), 14, 36);

    return {
      ...particlesConfig,
      particles: {
        ...particlesConfig.particles,
        number: {
          ...particlesConfig.particles.number,
          density: {
            ...particlesConfig.particles.number.density,
            enable: false,
          },
          value: particleCount,
        },
        size: {
          ...particlesConfig.particles.size,
          value: {
            min: minSize,
            max: maxSize,
          },
        },
      },
    };
  }, [viewport]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={dynamicConfig as any}
    />
  );
};

export default ParticlesBackground;
