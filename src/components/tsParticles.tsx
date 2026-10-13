"use client";
import { useSyncExternalStore } from "react";
import { Particles, ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 40, density: { enable: true, width: 800, height: 800 } },
    color: { value: "#21ccf1" },
    links: {
      enable: true,
      color: "#ffffff",
      opacity: 0.15,
      distance: 150,
    },
    move: { enable: true, speed: 0.4, outModes: { default: "bounce" } },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 2.5 } },
  },
  interactivity: {
    events: { onHover: { enable: false } },
  },
};

const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

const subscribeReducedMotion = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

function ParticlesContent({ id }: { id: string }) {
  const { loaded } = useParticlesProvider();
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  if (!loaded || reducedMotion) return null;
  return (
    <Particles
      id={id}
      className="pointer-events-none absolute inset-0"
      options={particleOptions}
    />
  );
}

export default function ParticleBackground({ id = "tsparticles" }: { id?: string }) {
  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesContent id={id} />
    </ParticlesProvider>
  );
}