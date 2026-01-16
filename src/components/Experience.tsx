import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import IntroModal from "./IntroModal";
import ExitModal from "./ExitModal";
import "./Experience.css";

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
      <div className="experience__brand">THE BACKROOM</div>

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
        camera={{ position: [0, 1.6, 0], fov: 75 }}
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
