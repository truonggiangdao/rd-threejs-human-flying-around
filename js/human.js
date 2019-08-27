function Character(scale) {
  'use strict';
  this.scale = scale;
  // Set the different geometries composing the humanoid
  var head = new THREE.SphereGeometry(8 * this.scale, 8, 8),
      hand = new THREE.SphereGeometry(2 * this.scale, 4, 4),
      foot = new THREE.SphereGeometry(4 * this.scale, 4, 4, 0, Math.PI * 2, 0, Math.PI / 2),
      nose = new THREE.SphereGeometry(1 * this.scale, 4, 4),
      // Set the material, the "skin"
      material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
  // Set the character modelisation object
  this.mesh = new THREE.Object3D();
  this.mesh.position.y = 12 * this.scale;
  // Set and add its head
  this.head = new THREE.Mesh(head, material);
  this.head.position.y = 0;
  this.mesh.add(this.head);
  // Set and add its hands
  this.hands = {
      left: new THREE.Mesh(hand, material),
      right: new THREE.Mesh(hand, material)
  };
  this.hands.left.position.x = -10 * this.scale;
  this.hands.left.position.y = -2 * this.scale;
  this.hands.right.position.x = 10 * this.scale;
  this.hands.right.position.y = -2 * this.scale;
  this.mesh.add(this.hands.left);
  this.mesh.add(this.hands.right);
  // Set and add its feet
  this.feet = {
      left: new THREE.Mesh(foot, material),
      right: new THREE.Mesh(foot, material)
  };
  this.feet.left.position.x = -5 * this.scale;
  this.feet.left.position.y = -12 * this.scale;
  this.feet.left.rotation.y = Math.PI / 4;
  this.feet.right.position.x = 5 * this.scale;
  this.feet.right.position.y = -12 * this.scale;
  this.feet.right.rotation.y = Math.PI / 4;
  this.mesh.add(this.feet.left);
  this.mesh.add(this.feet.right);
  // Set and add its nose
  this.nose = new THREE.Mesh(nose, material);
  this.nose.position.y = 0;
  this.nose.position.z = 8 * this.scale;
  this.mesh.add(this.nose);
  // Set the vector of the current motion
  this.direction = new THREE.Vector3(0, 0, 0);
  // Set the current animation step
  this.step = 0;
};

Character.prototype.setDirection = function (controls) {
  'use strict';
  // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
  var x = controls.left ? 1 : controls.right ? -1 : 0,
      y = 0,
      z = controls.up ? 1 : controls.down ? -1 : 0;
  this.direction.set(x, y, z);
};
Character.prototype.motion = function () {
  'use strict';
  // (if any)
  if (this.direction.x !== 0 || this.direction.z !== 0) {
      // Rotate the character
      this.rotate();
      // And, only if we're not colliding with an obstacle or a wall ...
      if (this.collide()) {
          return false;
      }
      // ... we move the character
      this.move();
      return true;
  }
};
Character.prototype.rotate = function () {
  'use strict';
  // Set the direction's angle, and the difference between it and our Object3D's current rotation
  var angle = Math.atan2(this.direction.x, this.direction.z),
      difference = angle - this.mesh.rotation.y;
  // If we're doing more than a 180°
  if (Math.abs(difference) > Math.PI) {
      // We proceed to a direct 360° rotation in the opposite way
      if (difference > 0) {
          this.mesh.rotation.y += 2 * Math.PI;
      } else {
          this.mesh.rotation.y -= 2 * Math.PI;
      }
      // And we set a new smarter (because shorter) difference
      difference = angle - this.mesh.rotation.y;
      // In short : we make sure not to turn "left" to go "right"
  }
  // Now if we haven't reached our target angle
  if (difference !== 0) {
      // We slightly get closer to it
      this.mesh.rotation.y += difference / 4;
  }
};
Character.prototype.move = function () {
  'use strict';
  // We update our Object3D's position from our "direction"
  this.mesh.position.x += this.direction.x * ((this.direction.z === 0) ? 4 : Math.sqrt(8));
  this.mesh.position.z += this.direction.z * ((this.direction.x === 0) ? 4 : Math.sqrt(8));
  // Now let's use Sine and Cosine curves, using our "step" property ...
  this.step += 1 / 4;
  // ... to slightly move our feet and hands
  this.feet.left.position.setZ(Math.sin(this.step) * 16);
  this.feet.right.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 16);
  this.hands.left.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 8);
  this.hands.right.position.setZ(Math.sin(this.step) * 8);
};
Character.prototype.collide = function () {
  'use strict';
  // INSERT SOME MAGIC HERE
  return false;
};

function createHuman(size) {
  const scale = size || 1;
  var mesh = new THREE.Object3D();

  // head
  var head = new THREE.Mesh(
    new THREE.BoxGeometry(scale * 1, scale * 1.2, scale * 1),
    new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
    // new THREE.MeshPhongMaterial({
    //   map: new THREE.TextureLoader().load('img/face.jpeg'),
    // })
  );

  mesh.add(head);

  // eyes
  var eyeGeo = new THREE.SphereGeometry(scale * 0.3, scale * 8, scale * 8);
  var eyeMat = new THREE.MeshLambertMaterial({ color: 0xCC8800 });
  var eye = new THREE.Mesh(eyeGeo, eyeMat);
  eye.position.set(scale * 0.4,scale * 0.6,scale * 0.6);
  var eye2 = new THREE.Mesh(eyeGeo, eyeMat);
  eye2.position.set(scale * -0.4,scale * 0.6,scale * 0.6);

  mesh.add(eye);
  mesh.add(eye2);

  // hands
  var handGeo = new THREE.BoxGeometry(scale * 2, scale * 0.5, scale * 0.5);
  var handMat = new THREE.MeshLambertMaterial({ color: 0xFF5500 });
  var hand1 = new THREE.Mesh(handGeo, handMat);
  hand1.position.set(scale * -2.1,scale * -0.7,scale * 0);
  var hand2 = new THREE.Mesh(handGeo, handMat);
  hand2.position.set(scale * 2.1,scale * -0.7,scale * 0);

  mesh.add(hand1);
  mesh.add(hand2);

  // body
  var bodyy = new THREE.Mesh(
    new THREE.BoxGeometry(scale * 1.5, scale * 2, scale * 1),
    new THREE.MeshLambertMaterial({ color: 0xCCDD88 })
  );
  bodyy.position.set(scale * 0,scale * -1.8,scale * 0);
  mesh.add(bodyy);

  // foots
  var footSize = new THREE.BoxGeometry(scale * 0.5, scale * 3, scale * 0.6);
  var footMaterial = new THREE.MeshLambertMaterial({ color: 0xFF5500 });
  var foot1 = new THREE.Mesh(
    footSize,
    footMaterial
  );
  foot1.position.set(scale * -0.7,scale * -4.5,scale * 0);
  var foot2 = new THREE.Mesh(
    footSize,
    footMaterial
  );
  foot2.position.set(scale * 0.7,scale * -4.5,scale * 0);

  mesh.add(foot1);
  mesh.add(foot2);
  return mesh;
};

function rotateHuman(human) {
  human.rotation.y += 0.05;
};
