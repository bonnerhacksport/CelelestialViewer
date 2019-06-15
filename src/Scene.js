import * as THREE from 'three';
import OrbitControlsAux from 'three-orbit-controls';
const OrbitControls = OrbitControlsAux(THREE);
export const factor = 10;

export const createScene = (
  dimensions={height: window.innerHeight, width: window.innerWidth},
  planets = [],
  trajectories = [],
  )=>{
  let camera, scene, renderer;
  const planetMeshes = [];
  init();
  animate();
  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();

    const planetFactor = 60268;
    Object.keys(planets).forEach((planetName)=> {
      const planet = planets[planetName];
      var texture = new THREE.TextureLoader().load( planet.texture );
      var geometry = new THREE.SphereBufferGeometry( planet.radius / planetFactor, 32, 32 );
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      const planetMesh = new THREE.Mesh( geometry, material );
      planetMeshes.push(planetMesh);
      scene.add( planetMesh );
    })
    planetMeshes.pop();

    
    trajectories.forEach((bodyTrajectories)=>{
      const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      const geometry = new THREE.Geometry();
      bodyTrajectories.forEach((trajectory)=>{
        geometry.vertices.push(new THREE.Vector3( factor*trajectory.x, factor*trajectory.y, factor*trajectory.z) );
      });
      
      const line = new THREE.Line( geometry, material );
      scene.add(line);
    });

    // Setting up controllers 
    new OrbitControls( camera, renderer.domElement );



    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.position.z = 5;
  }


  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  return { renderer, planetMeshes};
}