import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import IntroModal from "./IntroModal";
import ExitModal from "./ExitModal";
import "./Experience.css";
import levelConfig from "../../level_config.json";

interface ExperienceProps {
  onExit: () => void;
}

function Experience({ onExit }: ExperienceProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [showExitMenu, setShowExitMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowExitMenu((prev) => !prev);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleStart = () => {
    setShowIntro(false);
  };

  const handleResume = () => {
    setShowExitMenu(false);
  };

  const handleReturnToLanding = () => {
    setShowExitMenu(false);
    onExit();
  };

  return (
    <div className="experience">
      {/* Band name mark */}
      <div className="experience__brand">
        <img src="/RB_Text.png" alt="Really Bad" />
      </div>

      {/* Fullscreen button */}
      <button
        className="experience__fullscreen"
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? "⤓" : "⤢"}
      </button>

      {/* Mobile menu button */}
      <button
        className="experience__menu-btn"
        onClick={() => setShowExitMenu(true)}
      >
        ☰
      </button>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: levelConfig.spawn.position as [number, number, number], fov: 75 }}
        onCreated={({ camera }) => {
          const r = levelConfig.spawn.rotation as [number, number, number];
          camera.rotation.set(r[0], r[1], r[2]);
        }}
      >
        <Scene isPaused={showIntro || showExitMenu} />
      </Canvas>

      {/* Modals */}
      {showIntro && <IntroModal onStart={handleStart} />}
      {showExitMenu && (
        <ExitModal
          onResume={handleResume}
          onReturnToLanding={handleReturnToLanding}
        />
      )}
    </div>
  );
}

export default Experience;
