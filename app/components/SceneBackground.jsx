'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SceneBackground() {
  const canvasRef = useRef(null)
  const sceneRef = useRef({ camera: null, renderer: null, scene: null, animationId: null })

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    sceneRef.current.scene = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )
    camera.position.z = 100
    sceneRef.current.camera = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff, 0)
    sceneRef.current.renderer = renderer

    // Create subtle gradient background
    const planeGeometry = new THREE.PlaneGeometry(2000, 1500)
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollProgress: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float scrollProgress;
        
        void main() {
          vec3 color = mix(
            vec3(1.0, 1.0, 1.0),
            vec3(0.98, 0.98, 0.98),
            vUv.y
          );
          
          float noise = sin(vUv.x * 10.0 + time * 0.1) * 0.01;
          color += vec3(noise);
          
          color = mix(color, vec3(1.0, 0.98, 0.98), scrollProgress * 0.05);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
      depthWrite: false
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.z = -200
    scene.add(plane)

    // Animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      if (planeMaterial.uniforms) {
        planeMaterial.uniforms.time.value = time
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle scroll updates
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (planeMaterial.uniforms) {
        planeMaterial.uniforms.scrollProgress.value = scrollProgress
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }

      planeMaterial.dispose()
      planeGeometry.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
