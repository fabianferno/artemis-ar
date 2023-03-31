import ReactDOM from "react-dom";
import React from "react";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./model.gltf");
  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.007}
        // rotation={[0, Math.PI / 1, 0]}
      />
    </>
  );
};

function Box() {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}

ReactDOM.render(
  <ARCanvas
    camera={{ position: [0, 0, 0] }}
    dpr={window.devicePixelRatio}
    onCreated={({ gl }) => {
      gl.setSize(window.innerWidth, window.innerHeight);
    }}
  >
    <ambientLight />
    <pointLight position={[10, 10, 0]} />
    <ARMarker type={"pattern"} patternUrl={"data/hiro.patt"}>
      <React.Suspense fallback={Box}>
        <Model />
      </React.Suspense>
      {/*  */}
    </ARMarker>
  </ARCanvas>,
  document.getElementById("root")
);
