import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

// ============================================================================
// CONSTANTS
// ============================================================================

// Hub position (player spawn/reset) - facing orientation room from post-elevator hallway
const HUB_POSITION_X = 0;
const HUB_POSITION_Y = 1.6;
const HUB_POSITION_Z = 2;

// Loop trigger boundaries for hallways
const PURSUANCE_TRIGGER_X = -20;    // Left hallway trigger
const COMPLIANCE_TRIGGER_X = 20;     // Right hallway trigger
const SURVEILLANCE_TRIGGER_Z = 30;   // Center hallway trigger
const HALLWAY_MIN_Z = 12;            // Minimum Z for hallway detection
const HALLWAY_MAX_Z = 30;            // Maximum Z for hallway detection
const CENTER_MIN_X = -5;             // Center hallway min X bound
const CENTER_MAX_X = 5;              // Center hallway max X bound

// ============================================================================
// COMPONENT
// ============================================================================

function Environment() {
  const { camera } = useThree();

  // Loop detection - reset camera when player reaches hallway end
  useFrame(() => {
    const pos = camera.position;
    
    // PURSUANCE hallway loop (left side)
    if (pos.x < PURSUANCE_TRIGGER_X && pos.z > HALLWAY_MIN_Z && pos.z < HALLWAY_MAX_Z) {
      camera.position.set(HUB_POSITION_X, HUB_POSITION_Y, HUB_POSITION_Z);
      camera.rotation.set(0, 0, 0);
    }
    
    // SURVEILLANCE hallway loop (center)
    if (pos.z > SURVEILLANCE_TRIGGER_Z && pos.x > CENTER_MIN_X && pos.x < CENTER_MAX_X) {
      camera.position.set(HUB_POSITION_X, HUB_POSITION_Y, HUB_POSITION_Z);
      camera.rotation.set(0, 0, 0);
    }
    
    // COMPLIANCE hallway loop (right side)
    if (pos.x > COMPLIANCE_TRIGGER_X && pos.z > HALLWAY_MIN_Z && pos.z < HALLWAY_MAX_Z) {
      camera.position.set(HUB_POSITION_X, HUB_POSITION_Y, HUB_POSITION_Z);
      camera.rotation.set(0, 0, 0);
    }
  });

  return (
    <>
      {/* ================================================================== */}
      {/* FLOOR                                                              */}
      {/* ================================================================== */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* ================================================================== */}
      {/* ELEVATOR START AREA                                                */}
      {/* ================================================================== */}
      <group position={[0, 0, -10]}>
        {/* Back wall */}
        <mesh position={[0, 2, -3]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 4]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 4]} />
          <meshStandardMaterial color="#505050" />
        </mesh>

        {/* Door frame */}
        <mesh position={[0, 2, 1]} castShadow>
          <boxGeometry args={[4, 4, 0.1]} />
          <meshStandardMaterial color="#3a3a3a" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* POST-ELEVATOR HALLWAY (with orientation door and windows)          */}
      {/* ================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Back wall */}
        <mesh position={[0, 2, -8]} castShadow>
          <boxGeometry args={[12, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-6, 2, -2]} castShadow>
          <boxGeometry args={[0.2, 4, 12]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[6, 2, -2]} castShadow>
          <boxGeometry args={[0.2, 4, 12]} />
          <meshStandardMaterial color="#505050" />
        </mesh>

        {/* ORIENTATION door (center) */}
        <mesh position={[0, 2, 4]} castShadow>
          <boxGeometry args={[2.5, 3.5, 0.1]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        
        <Text
          position={[0, 2.5, 4.1]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ORIENTATION
        </Text>

        {/* Left window */}
        <mesh position={[-3.5, 2, 4]} castShadow>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
        </mesh>
        
        {/* Right window */}
        <mesh position={[3.5, 2, 4]} castShadow>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
        </mesh>
        
        {/* Wall sections flanking door and windows */}
        <mesh position={[-5.25, 2, 4]} castShadow>
          <boxGeometry args={[1.5, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        <mesh position={[5.25, 2, 4]} castShadow>
          <boxGeometry args={[1.5, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* DEPARTMENT HUB (branches to three departments)                     */}
      {/* ================================================================== */}
      <group position={[0, 0, 8]}>
        {/* Left wall with opening to PURSUANCE */}
        <mesh position={[-10, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 8]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall with opening to COMPLIANCE */}
        <mesh position={[10, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 8]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Back corner walls */}
        <mesh position={[-8, 2, -4]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        <mesh position={[8, 2, -4]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* PURSUANCE HALLWAY (left from hub)                                  */}
      {/* ================================================================== */}
      <group position={[-15, 0, 12]}>
        <Text
          position={[0, 2.5, 5]}
          fontSize={0.5}
          color="#f5b68b"
          anchorX="center"
          anchorY="middle"
        >
          PURSUANCE
        </Text>
        
        {/* Left wall */}
        <mesh position={[-2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 20]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Back wall (entrance from hub) */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* SURVEILLANCE HALLWAY (center from hub)                             */}
      {/* ================================================================== */}
      <group position={[0, 0, 16]}>
        <Text
          position={[0, 2.5, 2]}
          fontSize={0.5}
          color="#f5b68b"
          anchorX="center"
          anchorY="middle"
        >
          SURVEILLANCE
        </Text>
        
        {/* Left wall */}
        <mesh position={[-2.5, 2, 8]} castShadow>
          <boxGeometry args={[0.2, 4, 16]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2.5, 2, 8]} castShadow>
          <boxGeometry args={[0.2, 4, 16]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 16]} castShadow>
          <boxGeometry args={[5, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Back wall sections (entrance from hub) */}
        <mesh position={[-3.75, 2, 0]} castShadow>
          <boxGeometry args={[2.5, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        <mesh position={[3.75, 2, 0]} castShadow>
          <boxGeometry args={[2.5, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* COMPLIANCE HALLWAY (right from hub)                                */}
      {/* ================================================================== */}
      <group position={[15, 0, 12]}>
        <Text
          position={[0, 2.5, 5]}
          fontSize={0.5}
          color="#f5b68b"
          anchorX="center"
          anchorY="middle"
        >
          COMPLIANCE
        </Text>
        
        {/* Left wall */}
        <mesh position={[-2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 20]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
        
        {/* Back wall (entrance from hub) */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      </group>
    </>
  );
}

export default Environment;
