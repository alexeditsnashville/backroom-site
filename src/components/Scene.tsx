import { useRef } from "react";
import { Group } from "three";
import FirstPersonControls from "./FirstPersonControls";
import Environment from "./Environment";

interface SceneProps {
  isPaused: boolean;
}

function Scene({ isPaused }: SceneProps) {
  const groupRef = useRef<Group>(null);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* First Person Controls */}
      <FirstPersonControls isPaused={isPaused} />

      {/* Environment */}
      <group ref={groupRef}>
        <Environment />
      </group>
    </>
  );
}

export default Scene;
