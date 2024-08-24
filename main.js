import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js"


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xFFFF00)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 10);

const Control = new OrbitControls(camera, renderer.domElement);
// Control.enableDamping=true
// Control.screenSpacePanning=false
// Control.minDistance=10
// Control.maxDistance=100
// Control.maxPolarAngle=Math.PI*0.51
Control.update()

const directionallight = new THREE.DirectionalLight(0xffffff, 1)
directionallight.position.set(-10, 40, 0)
scene.add(directionallight)
directionallight.castShadow = true
directionallight.shadow.mapSize.width = 2048
directionallight.shadow.mapSize.length = 2048
directionallight.shadow.camera.left = -50
directionallight.shadow.camera.right = 50
directionallight.shadow.camera.top = 50
directionallight.shadow.camera.bottom = -50

// OBJECT Loader for gltf 
const loader = new OBJLoader()

const GltfObject = (textPath, scale,rotate,...pos) => {
  loader.load(textPath, (obj) => {
    const mesh = new THREE.Mesh(obj.children[0].geometry, obj.children[0].material)
    mesh.scale.set(scale, scale, scale)
    if(rotate){

      mesh.rotation.y=Math.PI/rotate
    }
    mesh.position.set(pos[0],pos[1],pos[2])
    scene.add(mesh)
    // console.log(obj.children[0].geometry)
  })
}
//shofa
GltfObject('public/uploads_files_3237879_sofa.obj', 0.02,false,-1,0,-4)
// const door=GltfObjec(t('public/uploads_files_715338_basic_door.obj',1)
// carpet
GltfObject('public/uploads_files_3679721_format3_obj/format3_obj.obj',0.018,false,-1,0,0)
// table
GltfObject('public/uploads_files_2604980_table/table/tablee.obj',0.13,false,-1,0,0)
//clock
GltfObject('public/uploads_files_3374228_mini+cupboard/mini cupboard.obj',1,false,-5,1.5,10)
//TV
GltfObject('public/32-fbxobj-formats/mitv.obj',2,true,0,0,10)
//window
GltfObject('public/uploads_files_3158526_Small_Square_Window-Final.obj',0.1,2,-6,5,0)





const floor = (geometry, name, texturepath) => {

  const loader = new THREE.TextureLoader();
  const texture = loader.load(texturepath); // Replace with your texture path

  const boxgeo = geometry;
  const matbox = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const object = new THREE.Mesh(boxgeo, matbox);
  object.userData.draggable = true//we can customize the userdata
  object.userData.name = `${name}`
  return object;
};

const wall = (geometry, name, texturepath) => {

  const loader = new THREE.TextureLoader();
  const texture = loader.load(texturepath); // Replace with your texture path

  const boxgeo = geometry
  const matbox = new THREE.MeshBasicMaterial({
    map: texture
  });
  const object = new THREE.Mesh(boxgeo, matbox);
  object.userData.draggable = true//we can customize the userdata
  object.userData.name = `${name}`
  return object;
};

const buildingSize = Math.sqrt(1000)

const floor1 = floor(new THREE.PlaneGeometry(buildingSize * 0.4, buildingSize * 0.6), 'floor1', 'public/wood_floor_arm_1k.jpg')
floor1.position.z = buildingSize * 0.1
floor1.rotation.x = -Math.PI / 2
scene.add(floor1)

const floor2 = floor(new THREE.PlaneGeometry(buildingSize * 0.8, buildingSize * 0.8), 'floor2', 'public/wood_floor_arm_1k.jpg')
floor2.position.set(buildingSize * (0.6), 0, 0)
floor2.rotation.x = -Math.PI / 2
scene.add(floor2)


// room1
const wall1 = wall(new THREE.BoxGeometry(buildingSize * 0.4, buildingSize / 4, 0.5), 'wall1', 'public/joe-woods-4Zaq5xY5M_c-unsplash.jpg')
wall1.position.set(0, buildingSize / 8, -buildingSize * 0.2)
scene.add(wall1)

const wall2 = wall(new THREE.BoxGeometry(buildingSize * 0.4, buildingSize / 4, 0.5), 'wall2', 'public/painted_plaster_wall_ao_1k.jpg')
wall2.position.set(0, buildingSize / 8, buildingSize * 0.39)
wall2.material.transparent = true
wall2.material.opacity = 0.5
scene.add(wall2)

const wall3 = wall(new THREE.BoxGeometry(buildingSize * 0.6, buildingSize / 4, 0.5), 'wall3', 'public/painted_plaster_wall_ao_1k.jpg')
wall3.position.set(-buildingSize / 5, buildingSize / 8, buildingSize / 10)
wall3.rotation.y = -Math.PI / 2
wall3.material.transparent = true
wall3.material.opacity = 0.5
scene.add(wall3)

const wall4=wall(new THREE.BoxGeometry(buildingSize * 0.45, buildingSize / 4, 0.5),'wall4','public/joe-woods-4Zaq5xY5M_c-unsplash.jpg')
wall4.position.set(buildingSize / 5, buildingSize / 8, buildingSize / 6)
wall4.rotation.y = -Math.PI / 2

scene.add(wall4)





//Animation loop
const animate = () => {

  renderer.render(scene, camera);

  // Control.update();
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});
renderer.setAnimationLoop(animate);
