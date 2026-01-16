import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

interface FirstPersonControlsProps {
  isPaused: boolean;
}

function FirstPersonControls({ isPaused }: FirstPersonControlsProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    crouch: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      
      switch (e.code) {
        case "KeyW":
          moveState.current.forward = true;
          break;
        case "KeyS":
          moveState.current.backward = true;
          break;
        case "KeyA":
          moveState.current.left = true;
          break;
        case "KeyD":
          moveState.current.right = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          moveState.current.sprint = true;
          break;
        case "ControlLeft":
        case "ControlRight":
          moveState.current.crouch = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          moveState.current.forward = false;
          break;
        case "KeyS":
          moveState.current.backward = false;
          break;
        case "KeyA":
          moveState.current.left = false;
          break;
        case "KeyD":
          moveState.current.right = false;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          moveState.current.sprint = false;
          break;
        case "ControlLeft":
        case "ControlRight":
          moveState.current.crouch = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPaused]);

  useFrame((state, delta) => {
    if (isPaused || !controlsRef.current?.isLocked) return;

    const speed = moveState.current.sprint ? 5 : 3;
    const height = moveState.current.crouch ? 1.2 : 1.6;
    
    // Update camera height for crouch
    camera.position.y += (height - camera.position.y) * 0.1;

    // Calculate movement direction
    direction.current.set(0, 0, 0);

    if (moveState.current.forward) direction.current.z -= 1;
    if (moveState.current.backward) direction.current.z += 1;
    if (moveState.current.left) direction.current.x -= 1;
    if (moveState.current.right) direction.current.x += 1;

    // Normalize direction to prevent faster diagonal movement
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply movement in camera's local space
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
    
    velocity.current.set(0, 0, 0);
    velocity.current.addScaledVector(forward, -direction.current.z);
    velocity.current.addScaledVector(right, direction.current.x);
    
    camera.position.addScaledVector(velocity.current, speed * delta);
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      enabled={!isPaused}
    />
  );
}

export default FirstPersonControls;
