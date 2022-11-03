/* global THREE, noise, requestAnimationFrame, TweenMax, Power1 */
// CREDIT: https://github.com/Mamboleoo/DecorativeBackgrounds

const canvas = document.querySelector('#scene')

let width = canvas.offsetWidth
let height = canvas.offsetHeight

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
renderer.setSize(width, height)
renderer.setClearColor(0x000000)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000)
camera.position.set(0, 0, 180)

var light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6)
scene.add(light)

var light = new THREE.DirectionalLight(0x590D82, 0.5)
light.position.set(200, 300, 400)
scene.add(light)
const light2 = light.clone()
light2.position.set(-200, 300, 400)
scene.add(light2)

const geometry = new THREE.IcosahedronGeometry(120, 4)
for (let i = 0; i < geometry.vertices.length; i++) {
  const vector = geometry.vertices[i]
  vector._o = vector.clone()
}
const material = new THREE.MeshPhongMaterial({
  emissive: 0x23f660,
  emissiveIntensity: 0.4,
  shininess: 0
})
const shape = new THREE.Mesh(geometry, material)
scene.add(shape)

function updateVertices (a) {
  for (let i = 0; i < geometry.vertices.length; i++) {
    const vector = geometry.vertices[i]
    vector.copy(vector._o)
    const perlin = noise.simplex3(
      (vector.x * 0.006) + (a * 0.0002),
      (vector.y * 0.006) + (a * 0.0003),
      (vector.z * 0.006)
    )
    const ratio = ((perlin * 0.4 * (mouse.y + 0.1)) + 0.8)
    vector.multiplyScalar(ratio)
  }
  geometry.verticesNeedUpdate = true
}

function render (a) {
  requestAnimationFrame(render)
  updateVertices(a)
  renderer.render(scene, camera)
}

function onResize () {
  canvas.style.width = ''
  canvas.style.height = ''
  width = canvas.offsetWidth
  height = canvas.offsetHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

var mouse = new THREE.Vector2(0.8, 0.5)
requestAnimationFrame(render)

let resizeTm
window.addEventListener('resize', function () {
  resizeTm = clearTimeout(resizeTm)
  resizeTm = setTimeout(onResize, 200)
})
