function createObject() {
  var geometry = new THREE.SphereGeometry(0.25, 16, 16);
  var material = new THREE.MeshPhongMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
function createEarth(size) {
  const scale = size || 1;
  var geometry = new THREE.SphereGeometry(scale * 1, scale * 32, scale * 32);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/earthmap.jpg'),
    bumpMap: new THREE.TextureLoader().load('img/earthbump1k.jpg'),
    bumpScale: 0.03,
    specularMap: new THREE.TextureLoader().load('img/earthspec1k.jpg'),
    specular: new THREE.Color('grey'),
  })
  var mesh = new THREE.Mesh(geometry, material)
  return mesh;
}
function createStarfield(size) {
  const scale = size || 1;
  var texture = new THREE.TextureLoader().load('img/galaxy_starfield.png');
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });
  var geometry = new THREE.SphereGeometry(scale * 25, scale * 32, scale * 32)
  var mesh = new THREE.Mesh(geometry, material)
  return mesh
}
function rotateEarth(earth) {
  earth.rotation.x += 0.001;
  earth.rotation.y += 0.001;
}