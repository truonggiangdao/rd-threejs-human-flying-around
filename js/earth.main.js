function initThreeWorld() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100 );
  camera.position.z = 3;

  var renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setClearColor('#E5E5E5');
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  var starSphere = createStarfield();
  scene.add(starSphere);

  var earthMesh = createEarth();
  scene.add(earthMesh);

  var newObject = createObject();
  newObject.position.set(-1.2, 0, 0);
  scene.add(newObject);

  // var person = new Character(1);
  // scene.add( person.mesh );

  var light = new THREE.PointLight(0xFFFFFF, 1, 100);
  light.position.set(1, 10, 10);
  scene.add( light );

  function moveObject(obj) {
    const currX = obj.position.x;
    const currY = obj.position.y;
    const currZ = obj.position.z;
    obj.position.set(currX + 0.01, currY, currZ + 0.001);
  }

  // renderer.render( scene, camera );

  function animate() {
    rotateEarth(earthMesh);
    moveObject(newObject);
    // rotateEarth(newObject);
    // person.move();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    console.log('Rendered.');
  }
  animate();
}