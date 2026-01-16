import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import levelConfig from "../../level_config.json";

// ============================================================================
// COMPONENT
// ============================================================================

function Environment() {
  const { camera } = useThree();

  // Extract spawn position from config
  const spawnPos = levelConfig.spawn.position;

  // Loop detection - reset camera when player reaches hallway end
  useFrame(() => {
    const pos = camera.position;
    
    // Check each loop trigger from config
    levelConfig.loopTriggers.forEach((trigger) => {
      const { condition } = trigger;
      let shouldTrigger = true;

      // Check x conditions - trigger only if position is within the defined range
      if (condition.x) {
        // Don't trigger if position is greater than max (outside bounds on the right)
        if (condition.x.max !== undefined && pos.x > condition.x.max) shouldTrigger = false;
        // Don't trigger if position is less than min (outside bounds on the left)
        if (condition.x.min !== undefined && pos.x < condition.x.min) shouldTrigger = false;
      }

      // Check z conditions - trigger only if position is within the defined range
      if (condition.z) {
        // Don't trigger if position is greater than max (outside bounds forward)
        if (condition.z.max !== undefined && pos.z > condition.z.max) shouldTrigger = false;
        // Don't trigger if position is less than min (outside bounds backward)
        if (condition.z.min !== undefined && pos.z < condition.z.min) shouldTrigger = false;
      }

      // Trigger teleport if all conditions met (position is within all specified ranges)
      if (shouldTrigger) {
        camera.position.set(spawnPos[0], spawnPos[1], spawnPos[2]);
        camera.rotation.set(0, 0, 0);
      }
    });
  });

  return (
    <>
      {/* ================================================================== */}
      {/* FLOOR                                                              */}
      {/* ================================================================== */}
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={levelConfig.floor.position as [number, number, number]}
      >
        <planeGeometry args={levelConfig.floor.size as [number, number]} />
        <meshStandardMaterial color={levelConfig.floor.color} />
      </mesh>

      {/* ================================================================== */}
      {/* ELEVATOR START AREA                                                */}
      {/* ================================================================== */}
      <group position={levelConfig.elevator.position as [number, number, number]}>
        {/* Back wall */}
        <mesh position={[0, 2, -3]} castShadow>
          <boxGeometry args={[levelConfig.elevator.room.width, levelConfig.elevator.room.height, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, levelConfig.elevator.room.height, levelConfig.elevator.room.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, levelConfig.elevator.room.height, levelConfig.elevator.room.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>

        {/* Door frame */}
        <mesh position={[0, 2, 1]} castShadow>
          <boxGeometry args={[levelConfig.elevator.room.width, levelConfig.elevator.room.height, 0.1]} />
          <meshStandardMaterial color={levelConfig.materials.doorTransparent} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* POST-ELEVATOR HALLWAY (with orientation door and windows)          */}
      {/* ================================================================== */}
      <group position={levelConfig.postElevatorHallway.position as [number, number, number]}>
        {/* Back wall */}
        <mesh position={[0, 2, -8]} castShadow>
          <boxGeometry args={[levelConfig.postElevatorHallway.size.width, levelConfig.postElevatorHallway.size.height, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-6, 2, -2]} castShadow>
          <boxGeometry args={[0.2, levelConfig.postElevatorHallway.size.height, levelConfig.postElevatorHallway.size.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[6, 2, -2]} castShadow>
          <boxGeometry args={[0.2, levelConfig.postElevatorHallway.size.height, levelConfig.postElevatorHallway.size.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>

        {/* ORIENTATION door (center) */}
        <mesh position={levelConfig.postElevatorHallway.orientationDoor.position as [number, number, number]} castShadow>
          <boxGeometry args={levelConfig.postElevatorHallway.orientationDoor.size as [number, number, number]} />
          <meshStandardMaterial color={levelConfig.materials.door} />
        </mesh>
        
        <Text
          position={levelConfig.postElevatorHallway.orientationDoor.labelPosition as [number, number, number]}
          fontSize={levelConfig.postElevatorHallway.orientationDoor.labelSize}
          color={levelConfig.materials.labelDefault}
          anchorX="center"
          anchorY="middle"
        >
          {levelConfig.postElevatorHallway.orientationDoor.label}
        </Text>

        {/* Left window */}
        <mesh position={levelConfig.postElevatorHallway.windows[0].position as [number, number, number]} castShadow>
          <boxGeometry args={levelConfig.postElevatorHallway.windows[0].size as [number, number, number]} />
          <meshStandardMaterial color={levelConfig.materials.window} transparent opacity={0.5} />
        </mesh>
        
        {/* Right window */}
        <mesh position={levelConfig.postElevatorHallway.windows[1].position as [number, number, number]} castShadow>
          <boxGeometry args={levelConfig.postElevatorHallway.windows[1].size as [number, number, number]} />
          <meshStandardMaterial color={levelConfig.materials.window} transparent opacity={0.5} />
        </mesh>
        
        {/* Wall sections flanking door and windows */}
        <mesh position={[-5.25, 2, 4]} castShadow>
          <boxGeometry args={[1.5, levelConfig.postElevatorHallway.size.height, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        <mesh position={[5.25, 2, 4]} castShadow>
          <boxGeometry args={[1.5, levelConfig.postElevatorHallway.size.height, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* DEPARTMENT HUB (branches to three departments)                     */}
      {/* ================================================================== */}
      <group position={levelConfig.hub.center as [number, number, number]}>
        {/* Left wall with opening to PURSUANCE */}
        <mesh position={[-levelConfig.hub.size.width / 2, 2, 0]} castShadow>
          <boxGeometry args={[0.2, levelConfig.hub.wallHeight, levelConfig.hub.size.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Right wall with opening to COMPLIANCE */}
        <mesh position={[levelConfig.hub.size.width / 2, 2, 0]} castShadow>
          <boxGeometry args={[0.2, levelConfig.hub.wallHeight, levelConfig.hub.size.depth]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        {/* Back corner walls */}
        <mesh position={[-8, 2, -4]} castShadow>
          <boxGeometry args={[4, levelConfig.hub.wallHeight, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
        
        <mesh position={[8, 2, -4]} castShadow>
          <boxGeometry args={[4, levelConfig.hub.wallHeight, 0.2]} />
          <meshStandardMaterial color={levelConfig.materials.wall} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* DEPARTMENT HALLWAYS (generated from config)                        */}
      {/* ================================================================== */}
      {levelConfig.departments.map((dept) => {
        const hw = dept.hallway;
        const halfWidth = hw.width / 2;
        const halfLength = hw.length / 2;
        
        return (
          <group key={dept.id} position={hw.center as [number, number, number]}>
            <Text
              position={hw.labelOffset as [number, number, number]}
              fontSize={0.5}
              color={dept.labelColor}
              anchorX="center"
              anchorY="middle"
            >
              {dept.name}
            </Text>
            
            {/* Left wall */}
            <mesh position={[-halfWidth, 2, halfLength]} castShadow>
              <boxGeometry args={[0.2, hw.wallHeight, hw.length]} />
              <meshStandardMaterial color={levelConfig.materials.wall} />
            </mesh>
            
            {/* Right wall */}
            <mesh position={[halfWidth, 2, halfLength]} castShadow>
              <boxGeometry args={[0.2, hw.wallHeight, hw.length]} />
              <meshStandardMaterial color={levelConfig.materials.wall} />
            </mesh>
            
            {/* End wall */}
            <mesh position={[0, 2, hw.length]} castShadow>
              <boxGeometry args={[hw.width, hw.wallHeight, 0.2]} />
              <meshStandardMaterial color={levelConfig.materials.wall} />
            </mesh>
            
            {/* Back wall (entrance from hub) */}
            {dept.entrance.wallSections ? (
              // Special entrance with split wall sections (e.g., SURVEILLANCE)
              dept.entrance.wallSections.map((section, idx) => (
                <mesh 
                  key={`wall-section-${idx}`}
                  position={section.position as [number, number, number]} 
                  castShadow
                >
                  <boxGeometry args={section.size as [number, number, number]} />
                  <meshStandardMaterial color={levelConfig.materials.wall} />
                </mesh>
              ))
            ) : (
              // Standard solid back wall
              <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[hw.width, hw.wallHeight, 0.2]} />
                <meshStandardMaterial color={levelConfig.materials.wall} />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

export default Environment;
