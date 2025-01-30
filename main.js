import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x3b3b3b); // grey

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Define meshes in a broader scope
let CSgear, MPgearA, MPgearB, holder1, holder2;

// Load first STL file
const loader = new STLLoader();
loader.load(
    '/STLs/sphericalgear.stl', // Path to the STL file in the /public folder
    function (geometry) {
        console.log('STL file loaded successfully');
        const material = new THREE.MeshStandardMaterial({
            color: 0x0077ff,
            metalness: 0.5,
            roughness: 0.5,
        });

        CSgear = new THREE.Mesh(geometry, material);
        CSgear.geometry.center();
        CSgear.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        scene.add(CSgear);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading STL file:', error);
    }
);

// Load second STL file
loader.load(
    '/STLs/monopolegear.stl', // Path to the second STL file
    function (geometry) {
        console.log('Second STL file loaded successfully');
        const material = new THREE.MeshStandardMaterial({
            color: 0xff7700, //orange
            metalness: 0.5,
            roughness: 0.5,
        });

        MPgearA = new THREE.Mesh(geometry, material);
        MPgearA.geometry.center();
        MPgearA.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        MPgearA.position.x = 4.8; // Move 48 mm along the x-axis
        scene.add(MPgearA);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading second STL file:', error);
    }
);

// Load third STL file
loader.load(
    '/STLs/monopolegear.stl', // Path to the third STL file
    function (geometry) {
        console.log('Third STL file loaded successfully');
        const material = new THREE.MeshStandardMaterial({
            color: 0xff7700, //orange
            metalness: 0.5,
            roughness: 0.5,
        });

        MPgearB = new THREE.Mesh(geometry, material);
        MPgearB.geometry.center();
        MPgearB.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        MPgearB.position.x = -4.8; // Move -48 mm along the x-axis
        scene.add(MPgearB);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading third STL file:', error);
    }
);

// Load first monopole holder STL file
loader.load(
    '/STLs/monopolegear_holder.stl', // Path to the first monopole holder STL file
    function (geometry) {
        console.log('First monopole holder STL file loaded successfully');
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff77, //green
            metalness: 0.5,
            roughness: 0.5,
        });

        holder1 = new THREE.Mesh(geometry, material);
        holder1.geometry.center();
        holder1.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        holder1.position.x = 7.9; // Move 96 mm along the x-axis
        scene.add(holder1);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading first monopole holder STL file:', error);
    }
);

// Load second monopole holder STL file
loader.load(
    '/STLs/monopolegear_holder.stl', // Path to the second monopole holder STL file
    function (geometry) {
        console.log('Second monopole holder STL file loaded successfully');
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff77, //green
            metalness: 0.5,
            roughness: 0.5,
        });

        holder2 = new THREE.Mesh(geometry, material);
        holder2.geometry.center();
        holder2.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        holder2.position.x = -7.9;// Move -48 mm along the x-axis
        scene.add(holder2);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading second monopole holder STL file:', error);
    }
);

// Camera position
camera.position.z = 10;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Do not allow panning

// Create sliders
const sliderX = document.createElement('input');
sliderX.type = 'range';
sliderX.min = '-360';
sliderX.max = '360';
sliderX.value = '0';
sliderX.style.position = 'absolute';
sliderX.style.top = '10px';
sliderX.style.left = '10px';
document.body.appendChild(sliderX);

const sliderY = document.createElement('input');
sliderY.type = 'range';
sliderY.min = '-360';
sliderY.max = '360';
sliderY.value = '0';
sliderY.style.position = 'absolute';
sliderY.style.top = '40px';
sliderY.style.left = '10px';
document.body.appendChild(sliderY);

const sliderZ = document.createElement('input');
sliderZ.type = 'range';
sliderZ.min = '-360';
sliderZ.max = '360';
sliderZ.value = '0';
sliderZ.style.position = 'absolute';
sliderZ.style.top = '70px';
sliderZ.style.left = '10px';
document.body.appendChild(sliderZ);

// Slider controls
sliderX.addEventListener('input', () => {
    if (CSgear) {
        CSgear.rotation.x = THREE.MathUtils.degToRad(sliderX.value);
    }

    

});

sliderY.addEventListener('input', () => {
    if (CSgear) {
        CSgear.rotation.y = THREE.MathUtils.degToRad(sliderY.value);
    }

});

sliderZ.addEventListener('input', () => {
    if (CSgear) {
        CSgear.rotation.z = THREE.MathUtils.degToRad(sliderZ.value);
    }



});

// Helper function to create rotation matrix
function getR(a, b, c) {
    const Rz = new THREE.Matrix4().makeRotationZ(c);
    const Ry = new THREE.Matrix4().makeRotationY(b);
    const Rx = new THREE.Matrix4().makeRotationX(a);

    const R = new THREE.Matrix4();
    R.multiply(Rx).multiply(Ry).multiply(Rz);
    return R;
}

// Main function to calculate rotations
function calculateRotations(r, p, y) {
    const aa = Math.PI / 2;
    const ba = 0;
    const ya = 0;

    const ab = -Math.PI / 2;
    const bb = 0;
    const yb = Math.PI;

    const ja = new THREE.Vector3(1, 0, 0);
    const jb = new THREE.Vector3(0, 1, 0);

    const qs = getR(r, p, y);
    const qa = getR(aa, ba, ya);
    const qb = getR(ab, bb, yb);

    const Ja = ja.clone().applyMatrix4(qs).applyMatrix4(new THREE.Matrix4().copy(qa).invert());
    const Jb = jb.clone().applyMatrix4(qs).applyMatrix4(new THREE.Matrix4().copy(qb).invert());

    const Jax = Ja.x;
    const Jbx = Jb.x;
    const Jay = Ja.y;
    const Jby = Jb.y;
    const Jaz = Ja.z;
    const Jbz = Jb.z;

    const ra = - Math.atan2(Jay, Jaz);
    const rb =  Math.atan2(Jby, Jbz);

    const pa =  2 * Math.acos(Jax)+Math.PI;
    const pb = 2 * Math.acos(Jbx);

    return { ra, pa, rb, pb};
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Get slider values in radians
    const r = THREE.MathUtils.degToRad(sliderX.value);
    const p = THREE.MathUtils.degToRad(sliderY.value);
    const y = THREE.MathUtils.degToRad(sliderZ.value);

    // Calculate rotations
    const rotations = calculateRotations(r, p, y);

    if (MPgearA) {
        MPgearA.rotation.set(rotations.ra, 0, rotations.pa);
    }

    if (MPgearB) {
        MPgearB.rotation.set(rotations.rb, 0, rotations.pb);
    }

    if (holder1) {
        holder1.rotation.set(rotations.ra, Math.PI, 0);
    }

    if (holder2) {
        holder2.rotation.set(rotations.rb, 0, 0);
    }
   

    controls.update(); // Update controls

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});