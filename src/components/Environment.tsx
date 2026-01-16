import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function Environment() {
  const { camera } = useThree();

  // Check if player is in a loop trigger zone
  useFrame(() => {
    const pos = camera.position;
    
    // Check PURSUANCE hallway loop (left side, far end)
    if (pos.x < -15 && pos.z > 5 && pos.z < 25) {
      // Return to hub
      camera.position.set(0, 1.6, 8);
      camera.rotation.set(0, 0, 0);
    }
    
    // Check SURVEILLANCE hallway loop (center, far end)
    if (pos.z > 25 && pos.x > -5 && pos.x < 5) {
      // Return to hub
      camera.position.set(0, 1.6, 8);
      camera.rotation.set(0, 0, 0);
    }
    
    // Check COMPLIANCE hallway loop (right side, far end)
    if (pos.x > 15 && pos.z > 5 && pos.z < 25) {
      // Return to hub
      camera.position.set(0, 1.6, 8);
      camera.rotation.set(0, 0, 0);
    }
  });

  return (
    <>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Elevator Room (Starting position) */}
      <group position={[0, 0, -5]}>
        {/* Elevator back wall */}
        <mesh position={[0, 2, -3]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Elevator left wall */}
        <mesh position={[-2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 4]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Elevator right wall */}
        <mesh position={[2, 2, -1]} castShadow>
          <boxGeometry args={[0.2, 4, 4]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>

        {/* Elevator door frame (simple representation) */}
        <mesh position={[0, 2, 1]} castShadow>
          <boxGeometry args={[4, 4, 0.1]} />
          <meshStandardMaterial color="#3a3a3a" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orientation Room (straight ahead from elevator) */}
      <group position={[0, 0, 10]}>
        {/* Front wall */}
        <mesh position={[0, 2, 5]} castShadow>
          <boxGeometry args={[8, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-4, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[4, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Back wall */}
        <mesh position={[0, 2, -5]} castShadow>
          <boxGeometry args={[8, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>

        {/* Orientation room label */}
        <Text
          position={[0, 2.5, 4.9]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ORIENTATION
        </Text>
      </group>

      {/* Left pathway around orientation room */}
      <group position={[-7, 0, 10]}>
        {/* Left corridor wall */}
        <mesh position={[-2, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* Right pathway around orientation room */}
      <group position={[7, 0, 10]}>
        {/* Right corridor wall */}
        <mesh position={[2, 2, 0]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* PURSUANCE Hallway (left side) */}
      <group position={[-12, 0, 10]}>
        {/* Hallway label */}
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
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 20]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* SURVEILLANCE Hallway (center) */}
      <group position={[0, 0, 17]}>
        {/* Hallway label */}
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.5}
          color="#f5b68b"
          anchorX="center"
          anchorY="middle"
        >
          SURVEILLANCE
        </Text>
        
        {/* Left wall */}
        <mesh position={[-2, 2, 5]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, 5]} castShadow>
          <boxGeometry args={[0.2, 4, 10]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 10]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* COMPLIANCE Hallway (right side) */}
      <group position={[12, 0, 10]}>
        {/* Hallway label */}
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
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[2, 2, 10]} castShadow>
          <boxGeometry args={[0.2, 4, 20]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* End wall */}
        <mesh position={[0, 2, 20]} castShadow>
          <boxGeometry args={[4, 4, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* Hub area walls (connecting pathways) */}
      {/* Back wall behind elevator */}
      <mesh position={[0, 2, -8]} castShadow>
        <boxGeometry args={[20, 4, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Left hub wall */}
      <mesh position={[-10, 2, 2]} castShadow>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Right hub wall */}
      <mesh position={[10, 2, 2]} castShadow>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </>
  );
}

export default Environment;
