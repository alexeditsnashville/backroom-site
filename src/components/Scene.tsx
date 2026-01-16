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
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Additional lights for hallway visibility */}
      <pointLight position={[0, 3, 0]} intensity={0.6} distance={20} />
      <pointLight position={[0, 3, 8]} intensity={0.6} distance={20} />

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
