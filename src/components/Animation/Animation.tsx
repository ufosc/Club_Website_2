// Adapted from a stock threejs example:
//
// https://threejs.org/examples/#webgl_interactive_raycasting_points
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_raycasting_points.html
//

import "../../global.css"
import "./Animation.css"

import React, { useEffect } from "react"
import * as THREE from 'three'

function generatePointCloudGeometry
(color: THREE.Color, width: number, length: number) {

  const geometry = new THREE.BufferGeometry()
  const numPoints = width * length
  const positions = new Float32Array(numPoints * 3)
  const colors = new Float32Array(numPoints * 3)
  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      const u = i / width
      const v = j / length
      const x = u - 0.5
      const y = (Math.cos(u * Math.PI * 4) + Math.sin(v * Math.PI * 8)) / 20
      const z = v - 0.5

      positions[3 * k] = x
      positions[3 * k + 1] = y
      positions[3 * k + 2] = z

      const intensity = (y + 0.1) * 5
      colors[3 * k] = color.r * intensity
      colors[3 * k + 1] = color.g * intensity
      colors[3 * k + 2] = color.b * intensity
      k++
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeBoundingBox()

  return geometry
}

function generatePointcloud
(color: THREE.Color, width: number, length: number, pointSize: number) {
  const geometry = generatePointCloudGeometry(color, width, length)
  const material = new THREE.PointsMaterial({
    size: pointSize,
    vertexColors: true
  })
  return new THREE.Points(geometry, material)
}

function generateIndexedPointcloud
(color: THREE.Color, width: number, length: number, pointSize: number) {
  const geometry = generatePointCloudGeometry(color, width, length)
  const numPoints = width * length
  const indices = new Uint16Array(numPoints)

  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      indices[k] = k
      k++
    }
  }

  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  const material = new THREE.PointsMaterial({
    size: pointSize,
    vertexColors: true
  })

  return new THREE.Points(geometry, material)
}

function generateIndexedWithOffsetPointcloud
(color: THREE.Color, width: number, length: number, pointSize: number) {
  const geometry = generatePointCloudGeometry(color, width, length)
  const numPoints = width * length
  const indices = new Uint16Array(numPoints)
  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      indices[k] = k
      k++
    }
  }

  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  geometry.addGroup(0, indices.length)
  const material = new THREE.PointsMaterial({
    size: pointSize,
    vertexColors: true
  })

  return new THREE.Points(geometry, material)
}

export default function (props: {children?: any, speed: number, scale: number}) {
  let camera = new THREE.PerspectiveCamera(45, 0, 1, 10000)
  let renderer = new THREE.WebGLRenderer({ antialias: true })
  let scene = new THREE.Scene()
  let clock = new THREE.Clock()
  let pointclouds : any = []
  let raycaster = new THREE.Raycaster()

  let intersection = null
  let spheresIndex = 0
  let toggle = 0

  const pointer = new THREE.Vector2()
  const spheres : any = []

  const threshold = 0.1
  const pointSize = 0.05

  // Height and length of 3D wave, not the component.
  const width = 80
  const length = 160

  const rotateY = new THREE.Matrix4().makeRotationY(props.speed)

  const render = () => {
    camera.applyMatrix4(rotateY)
    camera.updateMatrixWorld()
    raycaster.setFromCamera(pointer, camera)

    const intersections = raycaster.intersectObjects(pointclouds, false)
    intersection = (intersections.length) > 0 ? intersections[0] : null

    if (toggle > 0.02 && intersection !== null) {
      spheres[spheresIndex].position.copy(intersection.point)
      spheres[spheresIndex].scale.set(1, 1, 1)
      spheresIndex = (spheresIndex + 1) % spheres.length
      toggle = 0
    }

    for (let i = 0; i < spheres.length; i++) {
      const sphere = spheres[i]
      sphere.scale.multiplyScalar(0.98)
      sphere.scale.clampScalar(0.01, 1)
    }

    toggle += clock.getDelta()
    renderer.render(scene, camera)
  }

  const onPointerMove = (event: any) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
  }

  const dimensions = () => {
    // height of the animation is capped to at most 650px.
    const height = (window.innerHeight <= 650) ? window.innerHeight : 650
    return [ window.innerWidth - 15, height ]
  }

  const onWindowResize = () => {
    const dims = dimensions()
    camera.aspect = dims[0] / dims[1]
    camera.updateProjectionMatrix()
    renderer.setSize(dims[0], dims[1])
  }

  const animate = () => {
    requestAnimationFrame(animate)
    render()
  }

  useEffect(() => {
    // ThreeJS inserts a new scene into the animation__root element
    // whenever state updates. Disposing the renderer prevents
    // multiple animations accumulating.
    renderer.dispose()
    renderer = new THREE.WebGLRenderer({ antialias: true })

    const dims = dimensions()
    const container = document.getElementById('animation__root')
    if (container == null || typeof container == 'undefined') {
      return
    }

    camera = new THREE.PerspectiveCamera(props.scale, dims[0] / dims[1], 1, 10000)
    camera.position.set(3, -6, -8)
    camera.lookAt(scene.position)
    camera.updateMatrix()

    const pcBuffer = generatePointcloud(new THREE.Color(1, 0, 0),
      width, length, pointSize)

    pcBuffer.scale.set(5, 10, 10)
    pcBuffer.position.set(-5, 0, 0)
    scene.add(pcBuffer)

    const pcIndexed = generateIndexedPointcloud(new THREE.Color(0, 1, 0),
      width, length, pointSize)

    pcIndexed.scale.set(5, 10, 10)
    pcIndexed.position.set(0, 0, 0)
    scene.add(pcIndexed)

    const pcIndexedOffset = generateIndexedWithOffsetPointcloud(new THREE.Color(0,
      1, 1), width, length, pointSize)

    pcIndexedOffset.scale.set(5, 10, 10)
    pcIndexedOffset.position.set(5, 0, 0)
    scene.add(pcIndexedOffset)

    pointclouds = [pcBuffer, pcIndexed, pcIndexedOffset]
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

    for (let i = 0; i < 40; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      scene.add(sphere)
      spheres.push(sphere)
    }

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(dims[0], dims[1])
    container.appendChild(renderer.domElement)
    raycaster.params.Points.threshold = threshold

    window.addEventListener('resize', onWindowResize)
    document.addEventListener('pointermove', onPointerMove)

    animate()
  }, [])

  return (
    <div id="animation">
      <div id="animation__root" />
      <div id="animation__children">
        {props.children}
      </div>
  </div>
  )
}
