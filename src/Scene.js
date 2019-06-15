import * as THREE from 'three';

export const createScene = (dimensions, canvas)=>{
  let camera, scene, renderer;
  let mesh;
  init();
  animate();
  function init() {
    scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer(canvas);

renderer.setSize( window.innerWidth, window.innerHeight );
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  camera.position.z = 5;
  }


  function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  return renderer;
}