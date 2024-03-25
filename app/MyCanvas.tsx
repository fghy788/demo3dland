"use client";
import { Physics, useBox, useCylinder, usePlane } from "@react-three/cannon";
import {
   Box,
   Cylinder,
   Environment,
   Grid,
   MeshReflectorMaterial,
   MeshWobbleMaterial,
   OrbitControls,
   PerspectiveCamera,
   Plane,
   RoundedBox,
   Sky,
   useAnimations,
   useGLTF,
   useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useGraph, useThree } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import { Euler, Vector3 } from "three";

export const MyCanvas = ({ setTextBox }: any) => {
   return (
      <Canvas>
         <OrbitControls />
         <PerspectiveCamera makeDefault position={[150, 70, 0]} />
         <color attach="background" args={["#ffffff"]} />

         <ambientLight intensity={0.5} />
         <directionalLight position={[30, 30, 30]} intensity={1} />

         {/* <WobblyBox position={[0, 3, 0]} color="orange" /> */}
         <Physics>
            <MyGround />
            <Piramid />
            <FrontDoor />
            <LeftSide />
            <MiniPiramid />
            <MyBox mass={10000} position={[50, 25.01, -155]} args={[100, 50, 50]} />
            <Caktus />
            <MyCharacter setTextBox={setTextBox} />
         </Physics>
         {/* <MYGrid /> */}
         <Environment files={"/pure.exr"} background />
         {/* <EffectComposer>
            <DepthOfField focusDistance={500} focalLength={50} bokehScale={5} height={480} />
         </EffectComposer> */}
      </Canvas>
   );
};

const LeftSide = () => {
   return (
      <>
         <MyBox mass={10000} position={[-100, 5.01, 120]} args={[30, 10, 20]} />
         <MyBox mass={10000} position={[-107.5, 15.01, 120]} args={[15, 10, 20]} />
         <MyBox mass={10000} position={[-50, 10.01, 150]} args={[20, 20, 20]} />
         <MyBox mass={10000} position={[-20, 15.01, 150]} args={[20, 30, 20]} />

         <MyBox mass={10000} position={[20, 7.51, 120]} args={[20, 15, 20]} />
         <MyBox mass={10000} position={[20, 22.51, 120]} args={[10, 10, 10]} />

         <MyBox mass={10000} position={[50, 10.01, 80]} args={[30, 20, 30]} />
         <MyBox mass={10000} position={[45, 30.0, 75]} args={[20, 15, 20]} />
         {/* <MyBox mass={10000} position={[-20, 15.01, 150]} args={[20, 30, 20]} /> */}
      </>
   );
};

const Caktus = () => {
   return (
      <>
         <MyCaktus position={[70, 15.1, 120]} args={[2.4, 2, 30, 18]} />
         <MyCaktus position={[65, 10.1, 127]} args={[2.4, 2, 20, 18]} />
         <MyCaktus position={[58, 13.1, 125]} args={[2.4, 2, 26, 18]} />
         <MyCaktus position={[65, 15.1, 130]} args={[2.4, 2, 30, 18]} />

         <MyCaktus position={[80, 15.1, -110]} args={[2.4, 2, 30, 18]} />
         <MyCaktus position={[75, 10.1, -110]} args={[2.4, 2, 20, 18]} />
         <MyCaktus position={[58, 13.1, -110]} args={[2.4, 2, 26, 18]} />
         <MyCaktus position={[60, 15.1, -105]} args={[2.4, 2, 30, 18]} />
      </>
   );
};

const FrontDoor = () => {
   return (
      <>
         <MyBox mass={10000} position={[120, 32.01, 0]} args={[5, 5, 15]} />
         <MyBox mass={10000} position={[120, 24.01, 0]} args={[5, 5, 30]} />
         <MyBox mass={10000} position={[120, 10.1, 10]} args={[5, 20, 5]} />
         <MyBox mass={10000} position={[120, 10.1, -10]} args={[5, 20, 5]} />

         <MyBox mass={10000} position={[120, 5.01, 30]} args={[10, 10, 30]} />
         <MyBox mass={10000} position={[120, 5.01, 60]} args={[10, 10, 30]} />
         <MyBox mass={10000} position={[120, 5.01, -30]} args={[10, 10, 30]} />
         <MyBox mass={10000} position={[120, 5.01, -60]} args={[10, 10, 30]} />

         <MyBox mass={10000} position={[120, 20, -100]} args={[10, 10, 30]} rotation={[(45 * Math.PI) / 180, (-45 * Math.PI) / 180, 0]} />
         <MyBox mass={10000} position={[130, 20, -130]} args={[10, 10, 30]} rotation={[(45 * Math.PI) / 180, (45 * Math.PI) / 180, 0]} />
         <MyBox mass={10000} position={[140, 20, -143]} args={[10, 10, 30]} rotation={[(45 * Math.PI) / 180, (45 * Math.PI) / 180, 0]} />
      </>
   );
};

const Piramid = () => {
   let Array: any = [];
   let CubeSize = 10;
   let MyFloor = 10;

   for (let floor = 0; floor < MyFloor; floor++) {
      const TempObject = [0, CubeSize / 2 + 0.1, 0];
      TempObject[1] += MyFloor * CubeSize - CubeSize * floor;

      for (let x = 0; x < floor; x++) {
         for (let y = 0; y < floor; y++) {
            const InputArr = [TempObject[0] + x * (CubeSize + 0.1) - (CubeSize / 2) * floor, TempObject[1], TempObject[2] + y * (CubeSize + 0.1) - (CubeSize / 2) * floor];
            InputArr[0] -= 80;
            Array.push(InputArr);
         }
      }
   }

   return (
      <>
         {Array.map((position: any, index: any) => (
            <MyBox key={index} mass={0} position={position} args={[CubeSize, CubeSize, CubeSize]} />
         ))}

         <MyBox mass={0} position={[-80, 5.1, -5]} args={[120, 10, 120]} />
      </>
   );
};

const MiniPiramid = () => {
   let Array: any = [];
   let CubeSize = 10;
   let MyFloor = 5;

   for (let floor = 0; floor < MyFloor; floor++) {
      const TempObject = [0, CubeSize / 2 + 0.1, 0];
      TempObject[1] += MyFloor * CubeSize - CubeSize * floor - CubeSize;

      for (let x = 0; x < floor; x++) {
         for (let y = 0; y < floor; y++) {
            const InputArr = [TempObject[0] + x * (CubeSize + 0.1) - (CubeSize / 2) * floor, TempObject[1], TempObject[2] + y * (CubeSize + 0.1) - (CubeSize / 2) * floor];
            // InputArr[0] += 30;
            InputArr[2] -= 100;
            Array.push(InputArr);
         }
      }
   }

   return (
      <>
         {Array.map((position: any, index: any) => (
            <MyBox key={index} mass={0} position={position} args={[CubeSize, CubeSize, CubeSize]} />
         ))}
      </>
   );
};

const MyCaktus = ({ position, args }: any) => {
   const [ref]: any = useCylinder(() => ({ mass: 0, position, args }));

   //  [1.2, 1, 20, 18]

   return (
      <>
         <mesh ref={ref}>
            <Cylinder args={args}>
               <meshToonMaterial color="#2E7D32" />
            </Cylinder>
         </mesh>
      </>
   );
};

const MyBox = ({ mass, position, args, rotation }: any) => {
   const [ref]: any = useBox(() => ({ mass, position, args, rotation }));

   return (
      <>
         <mesh ref={ref}>
            <RoundedBox args={args} radius={0.5} smoothness={4}>
               <meshToonMaterial color="#FEF2CD" />
            </RoundedBox>
         </mesh>
      </>
   );
};

const MyCharacter = ({ setTextBox }: any) => {
   const [ref, api]: any = useBox(() => ({ mass: 2, position: [150, 8, 0], args: [5, 16, 5] }));

   const Edan = useGLTF("/Ybot.gltf");
   const { actions } = useAnimations(Edan.animations, Edan.scene);
   const [MyAction, setMyAction] = useState<string>("Idle");
   const Three = useThree();

   const Curposition = useRef([0, 0, 0]);
   useEffect(() => {
      const unsubscribe = api.position.subscribe((v: any) => (Curposition.current = v));
      return unsubscribe;
   }, []);

   const [Mykey, setMykey] = useState({
      w: false,
      a: false,
      s: false,
      d: false,
      space: false,
      shift: false,
   });

   useFrame((state) => {
      if (Curposition.current[0] > 140 && Curposition.current[0] < 160 && Curposition.current[2] > -10 && Curposition.current[2] < 10) {
         setTextBox(true);
      } else if (Curposition.current[0] > -20 && Curposition.current[0] < 10 && Curposition.current[2] > -20 && Curposition.current[2] < 10) {
         setTextBox(true);
      } else {
         setTextBox(false);
      }

      if (!ref.current) return;
      api.velocity.set(0, 0, 0);
      const camera = new Vector3();

      if (camera) {
         const direction = new Vector3();
         ref.current?.getWorldDirection(direction);

         const Cur = new Vector3();
         Cur.setX(Curposition.current[0]);
         Cur.setY(Curposition.current[1]);
         Cur.setZ(Curposition.current[2]);
         direction.y -= 0.4;

         Cur.add(direction.multiplyScalar(-20));

         Three.camera.position.copy(Cur);
         Three.camera.lookAt(Curposition.current[0], Curposition.current[1] + 6, Curposition.current[2]);
      }

      if (Mykey["w"]) {
         if (Mykey["shift"]) {
            setMyAction("Running");

            const direction = new Vector3();
            ref.current?.getWorldDirection(direction);

            const Cur = new Vector3();
            Cur.setX(Curposition.current[0]);
            Cur.setY(Curposition.current[1]);
            Cur.setZ(Curposition.current[2]);
            direction.y = 0;
            Cur.add(direction.multiplyScalar(1));

            api.position.copy(Cur); // Adjust the velocity as needed
         } else {
            setMyAction("Walking");

            const direction = new Vector3();
            ref.current?.getWorldDirection(direction);

            const Cur = new Vector3();
            Cur.setX(Curposition.current[0]);
            Cur.setY(Curposition.current[1]);
            Cur.setZ(Curposition.current[2]);

            direction.y = 0;
            Cur.add(direction.multiplyScalar(0.5));

            api.position.copy(Cur); // Adjust the velocity as needed
         }
      }
      if (Mykey["s"]) {
         if (Mykey["shift"]) {
            setMyAction("Running");
            const direction = new Vector3();
            const Cur = new Vector3();
            Cur.setX(Curposition.current[0]);
            Cur.setY(Curposition.current[1]);
            Cur.setZ(Curposition.current[2]);

            ref.current?.getWorldDirection(direction);
            direction.y = 0;
            Cur.add(direction.multiplyScalar(-1));

            api.position.copy(Cur); // Adjust the velocity as needed
         } else {
            setMyAction("Walking");
            const direction = new Vector3();
            const Cur = new Vector3();
            Cur.setX(Curposition.current[0]);
            Cur.setY(Curposition.current[1]);
            Cur.setZ(Curposition.current[2]);

            ref.current?.getWorldDirection(direction);
            direction.y = 0;
            Cur.add(direction.multiplyScalar(-0.5));

            api.position.copy(Cur); // Adjust the velocity as needed
         }
      }
      if (Mykey["a"]) {
         ref.current.rotation.set(0, ref.current.rotation.y + 0.1, 0);
         api.rotation.set(ref.current.rotation.x, ref.current.rotation.y + 0.1, ref.current.rotation.z);
      }
      if (Mykey["d"]) {
         ref.current.rotation.set(0, ref.current.rotation.y - 0.1, 0);
         api.rotation.set(ref.current.rotation.x, ref.current.rotation.y - 0.1, ref.current.rotation.z);
      }
   });

   useEffect(() => {
      window.addEventListener("keydown", (e) => {
         const key = e.key.toLowerCase();
         const TempObj: any = Mykey;
         TempObj[key] = true;
         if (key === " ") TempObj["space"] = true;

         if (!TempObj[key]) {
            setMykey(TempObj);
         }
      });

      window.addEventListener("keyup", (e) => {
         const key = e.key.toLowerCase();
         const TempObj: any = Mykey;
         TempObj[key] = false;

         if (TempObj[key]) {
            setMykey(TempObj);
         }
         setMyAction("Idle");
      });
   }, []);

   useEffect(() => {
      actions[MyAction]?.reset().fadeIn(0.1).play();
      return () => {
         actions[MyAction]?.fadeOut(0.1);
      };
   }, [MyAction]);

   return (
      <group ref={ref}>
         <primitive object={Edan.scene} position={[0, 1, 0]} scale={0.1} />
      </group>
   );
};

const MyGround = () => {
   const [ref]: any = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], args: [500, 500] }));

   return (
      <>
         <mesh ref={ref}>
            <Plane receiveShadow args={[500, 500]}>
               <MeshReflectorMaterial color="#E3A759" mirror={0} roughness={0} />
            </Plane>
         </mesh>
      </>
   );
};

const MYGrid = () => {
   return (
      <>
         <Grid args={[500, 500]} sectionSize={1} cellThickness={0} sectionColor="#FACB7E" sectionThickness={5} position={[0, 0.005, 0]}></Grid>
      </>
   );
};
