var scene, camera, renderer, controls, projector, geometry, dope;
var humanTurn = 1;
var rad = 100;

var mouse = new THREE.Vector2(),
    INTERSECTED;

function addAxis() {
    //use utitilitit
    var axis = new THREE.AxisHelper(1000.25);
    scene.add(axis);
}
init();
animationLoop();

//MATH FUNCTIONS
latLngToVector3 = (latLng, radius) => {
    const phi = Math.PI * (0.5 - latLng.lat / 180);
    const theta = Math.PI * (latLng.lng / 180);
    const spherical = THREE.Spherical(radius || latLng.radius || 1, phi, theta);
    return new THREE.Vector3().setFromSpherical(spherical);
};

fibonacci_spiral_sphere = async (points) => {
    var pointArray = [];

    let gr = (Math.sqrt(5.0) + 1.0) / 2.0;
    let ga = (2.0 - gr) * (2.0 * Math.PI);
    for (let i = 0; i <= points; ++i) {
        let lat = Math.asin(-1.0 + (2.0 * i) / (points + 1));
        let lon = ga * i;
        var x = Math.cos(lon) * Math.cos(lat);
        var y = Math.sin(lon) * Math.cos(lat);
        var z = Math.sin(lat);
        pointArray[i] = [x, y, z];
    }
    console.log("inside");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("3");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("2");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("1");
    await new Promise((r) => setTimeout(r, 1000));

    return pointArray;
};

//addAxis();
//window resizeBy
function init() {
    //renders the whole scene to make it viewable
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    //setting the pixel size for the render
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //appending the render  to the container
    document.body.appendChild(renderer.domElement);
    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 230;
    //trackball controllers
    //allows camera movement using mouse!!!
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener("change", render);
    controls.rotateSpeed = 2.0;
    //how far you can zoom out
    controls.maxDistance = 100;
    //how far you zoom in
    controls.minDistance = 80;
    //controls the slipperiness after moving controllers
    controls.dynamicDampingFactor = 0.2;
    controls.staticMoving = false;
    controls.noPan = true;
    controls.noZoom = false;
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 1.2;
    controls.target.set(0, 0, 0);
    //set the scene!
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    // Add listener for window resize.
    window.addEventListener("resize", onWindowResize, false);
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    render();
    controls.update();
}
//to prevent the scene from constantly rendering over and over again
function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}
//Adding the purple
function addGlobeSphere() {
    let length = 200;
    const geometry = new THREE.SphereGeometry(50, length, length);
    const material = new THREE.MeshPhongMaterial({
        color: 0xc16108b, // purple (can also use a CSS color string here)
        flatShading: true,
        shininess: 2,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}
async function addGlobe() {
    let globescale = 50;
    geometry = new THREE.Geometry(); /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
    let size = globescale * 0.005;
    let upperLimit = 90;
    particleCount = 100; /* Leagues under the sea */
    materials = new THREE.PointCloudMaterial({
        size: size,
        color: 0xffffff,
    });
    //
    console.log(mapData.length + "length");
    for (let i = 0; i < mapData.length; i += 5) {

        let coord = latLngToVector3({ lat: mapData[i][1], lng: mapData[i][0] });

        var vertex = new THREE.Vector3();
        vertex.x = coord.x * globescale;
        vertex.y = coord.y * globescale;
        vertex.z = coord.z * globescale;
        geometry.vertices.push(vertex);
        
    }
   
    // }
    particles = new THREE.PointCloud(geometry, materials);
    scene.add(particles);
}
addGlobeSphere();
addGlobe();
