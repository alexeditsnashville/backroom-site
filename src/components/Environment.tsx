import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import levelConfig from "../../level_config.json";

type Vec3 = [number, number, number];

type LoopTrigger = {
  condition?: {
    x?: { min?: number; max?: number };
    z?: { min?: number; max?: number };
  };
};

function asVec3(v: any, fallback: Vec3): Vec3 {
  return Array.isArray(v) && v.length === 3 ? [v[0], v[1], v[2]] : fallback;
}

function Environment() {
  const { camera } = useThree();

  const spawnPos = asVec3((levelConfig as any)?.spawn?.position, [0, 1.6, 2]);
  const spawnRot = asVec3((levelConfig as any)?.spawn?.rotation, [0, 0, 0]);

  const triggers: LoopTrigger[] = ((levelConfig as any)?.loopTriggers ?? []) as LoopTrigger[];

  // Loop detection - reset camera when player reaches hallway end
  useFrame(() => {
    const pos = camera.position;

    for (const trigger of triggers) {
      const c = trigger?.condition;
      if (!c) continue;

      let shouldTrigger = true;

      if (c.x) {
        if (c.x.max !== undefined && pos.x > c.x.max) shouldTrigger = false;
        if (c.x.min !== undefined && pos.x < c.x.min) shouldTrigger = false;
      }

      if (c.z) {
        if (c.z.max !== undefined && pos.z > c.z.max) shouldTrigger = false;
        if (c.z.min !== undefined && pos.z < c.z.min) shouldTrigger = false;
      }

      if (shouldTrigger) {
        camera.position.set(spawnPos[0], spawnPos[1], spawnPos[2]);
        camera.rotation.set(spawnRot[0], spawnRot[1], spawnRot[2]);
        break;
      }
    }
  });

  // Basic materials / defaults
  const wallColor = ((levelConfig as any)?.materials?.wall as string) ?? "#2a2a2a";
  const floorColor = ((levelConfig as any)?.floor?.color as string) ?? "#1b1b1b";

  // Floor
  const floorPos = asVec3((levelConfig as any)?.floor?.position, [0, 0, 0]);
  const floorSize = (Array.isArray((levelConfig as any)?.floor?.size) ? (levelConfig as any).floor.size : [80, 80]) as [number, number];

  // Elevator blockout
  const elevPos = asVec3((levelConfig as any)?.elevator?.position, [0, 0, -10]);
  const elevRoom = (levelConfig as any)?.elevator?.room ?? { width: 4, height: 2.2, depth: 4 };

  // Hallway blockout
  const hallPos = asVec3((levelConfig as any)?.postElevatorHallway?.position, [0, 0, -4]);
  const hallSize = (levelConfig as any)?.postElevatorHallway?.size ?? { width: 10, height: 2.2, depth: 14 };

  // Simple department labels
  const departments = ((levelConfig as any)?.departments ?? []) as any[];

  return (
    <>
      {/* Floor */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={floorPos}
      >
        <planeGeometry args={floorSize} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      {/* Elevator room (simple boxy walls) */}
      <group position={elevPos}>
        {/* Back wall */}
        <mesh castShadow position={[0, elevRoom.height / 2, -(elevRoom.depth / 2)]}>
          <boxGeometry args={[elevRoom.width, elevRoom.height, 0.2]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        {/* Left wall */}
        <mesh castShadow position={[-elevRoom.width / 2, elevRoom.height / 2, 0]}>
          <boxGeometry args={[0.2, elevRoom.height, elevRoom.depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        {/* Right wall */}
        <mesh castShadow position={[elevRoom.width / 2, elevRoom.height / 2, 0]}>
          <boxGeometry args={[0.2, elevRoom.height, elevRoom.depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        {/* Door frame hint */}
        <mesh castShadow position={[0, elevRoom.height / 2, elevRoom.depth / 2]}>
          <boxGeometry args={[elevRoom.width, elevRoom.height, 0.1]} />
          <meshStandardMaterial color={"#111"} transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Post-elevator hallway (simple corridor) */}
      <group position={hallPos}>
        {/* Left wall */}
        <mesh castShadow position={[-hallSize.width / 2, hallSize.height / 2, hallSize.depth / 2]}>
          <boxGeometry args={[0.2, hallSize.height, hallSize.depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        {/* Right wall */}
        <mesh castShadow position={[hallSize.width / 2, hallSize.height / 2, hallSize.depth / 2]}>
          <boxGeometry args={[0.2, hallSize.height, hallSize.depth]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        {/* End wall */}
        <mesh castShadow position={[0, hallSize.height / 2, hallSize.depth]}>
          <boxGeometry args={[hallSize.width, hallSize.height, 0.2]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>

        <Text
          position={[0, 1.3, hallSize.depth - 1]}
          fontSize={0.35}
          color={"#c9b98a"}
          anchorX="center"
          anchorY="middle"
        >
          ORIENTATION
        </Text>
      </group>

      {/* Department labels at their configured hallway centers (if present) */}
      {departments.map((d, idx) => {
        const center = asVec3(d?.hallway?.center, [0, 1.4, 0]);
        return (
          <Text
            key={d?.id ?? idx}
            position={center}
            fontSize={0.5}
            color={d?.labelColor ?? "#d8cfa6"}
            anchorX="center"
            anchorY="middle"
          >
            {d?.name ?? "DEPARTMENT"}
          </Text>
        );
      })}
    </>
  );
}

export default Environment;
