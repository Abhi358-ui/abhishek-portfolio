import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader'



const Computers = ({ isMobile }) => {

  const computer = useGLTF('/desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
      groundColor="white"
      />
      <pointLight intensity={1}/>
      <spotLight 
        position={[-20,50,10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
        castShadow
      />

      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.10 : 0.75}
        position={isMobile ? [0,-3, -2.2] :[0,-3.25,-1.5]}
        rotation={[-0.01,-0.2,-0.1]}
        
      />
    </mesh>
  )
}

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {

    // add a listener to changes the screen size
   const mediaQuery = window.matchMedia('(max-width: 300px)');

   // set the initial value of the isMobile state value
   setIsMobile(mediaQuery.matches);

   // define a callback to handle the media query
   const handleMediaQueryChange = (event) => {
    setIsMobile(event.matches);
   }

   // add the callback function as a listener for change the media query
   mediaQuery.addEventListener('change', handleMediaQueryChange);

   // remove the listener when the component is mounted
   return (
    mediaQuery.removeEventListener('change', handleMediaQueryChange)
   )
  }, [])
  

  return (
    <Canvas 
      frameloop='demand'
      shadows
      camera={{position : [20,3,5], fov : 25}}
      gl={{preserveDrawingBuffer: true}}
    >

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
      
    </Canvas>
  )
}
export default ComputersCanvas