/* global requestAnimationFrame */
import * as THREE from './three.module.js'
import * as BufferGeometryUtils from './BufferGeometryUtils.js'

const PARTICLE_SIZE = 20

let renderer2, scene2, camera2
let particles
let raycaster, intersects
let pointer, INTERSECTED

const init = () => {
  const container = document.getElementById('scene0')
  scene2 = new THREE.Scene()
  camera2 = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
  camera2.position.z = 220

  let boxGeometry = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16)

  boxGeometry.deleteAttribute('normal')
  boxGeometry.deleteAttribute('uv')
  boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry)

  const positionAttribute = boxGeometry.getAttribute('position')

  const colors = []
  const sizes = []
  const color = new THREE.Color()

  for (let i = 0, l = positionAttribute.count; i < l; i++) {
    color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5)
    color.toArray(colors, i * 3)

    sizes[i] = PARTICLE_SIZE * 0.5
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', positionAttribute)
  geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('./assets/disc.png', (texture) => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: texture },
        alphaTest: { value: 0.9 }
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent
    })

    particles = new THREE.Points(geometry, material)
    scene2.add(particles)

    renderer2 = new THREE.WebGLRenderer()
    renderer2.setPixelRatio(window.devicePixelRatio)
    renderer2.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer2.domElement)

    raycaster = new THREE.Raycaster()
    pointer = new THREE.Vector2()

    window.addEventListener('resize', onWindowResize)
    document.addEventListener('pointermove', onPointerMove)

    animate()
  })
}

const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

const onWindowResize = () => {
  camera2.aspect = window.innerWidth / window.innerHeight
  camera2.updateProjectionMatrix()

  renderer2.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  requestAnimationFrame(animate)
  dotrender()
}

const dotrender = () => {
  particles.rotation.x += 0.0005
  particles.rotation.y += 0.001

  const geometry = particles.geometry
  const attributes = geometry.attributes

  raycaster.setFromCamera(pointer, camera2)
  intersects = raycaster.intersectObject(particles)

  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].index) {
      attributes.size.array[INTERSECTED] = PARTICLE_SIZE

      INTERSECTED = intersects[0].index

      attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 1.25
      attributes.size.needsUpdate = true
    }
  } else if (INTERSECTED !== null) {
    attributes.size.array[INTERSECTED] = PARTICLE_SIZE
    attributes.size.needsUpdate = true
    INTERSECTED = null
  }

  renderer2.render(scene2, camera2)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
