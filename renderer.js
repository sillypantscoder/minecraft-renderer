async function render(textures, world) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	var timeoutDelta = 5
	var timeout = timeoutDelta
	// Block setup
	var blocks = []
	for (var i = 0; i < textures.length; i++) {
		if (textures[i] == null) {
			blocks.push(null)
		} else {
			function loadTexture(filename) {
				if (filename[filename.length - 1] == "4") {
					// load video texture
					let textureVid = document.createElement("video")
					textureVid.src = `/textures/${filename}`; // transform gif to mp4
					textureVid.loop = true;
					textureVid.play();


					// Load video texture
					let videoTexture = new THREE.VideoTexture(textureVid);
					videoTexture.format = THREE.RGBFormat;
					videoTexture.minFilter = THREE.NearestFilter;
					videoTexture.maxFilter = THREE.NearestFilter;
					videoTexture.generateMipmaps = false;
					return new THREE.MeshPhongMaterial({ map: videoTexture/*, transparent: true, opacity: 0.6*/ })
				} else {
					return new THREE.MeshPhongMaterial({ map: loader.load('/textures/' + filename) })
				}
			}
			blocks.push([
				loadTexture(textures[i].side),
				loadTexture(textures[i].side),
				loadTexture(textures[i].top),
				loadTexture(textures[i].bottom),
				loadTexture(textures[i].side),
				loadTexture(textures[i].side)
			])
		}
	}
	// Add the blocks
	function addCubes() {
		function func(x, y, z) { return world[x][y][z] }
		for (var x = 0; x < world_size; x++) {
			for (var y = 0; y < max_height; y++) {
				for (var z = 0; z < world_size; z++) {
					if (func(x, y, z)) {
						setTimeout((x, y, z, material, info) => {
							var geometry = new THREE.BoxGeometry(1, info.height, 1);
							geometry.translate(x - (world_size / 2), y - (world_size / 2), z - (world_size / 2))
							geometry.translate(0, (1 - info.height) / -2, 0)
							var color = 0xFFFFFF
							// Add cube
							//var material = new THREE.MeshPhongMaterial({ color: color });
							var cube = new THREE.Mesh( geometry, material );
							scene.add( cube );
							// Add wireframe
							//var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
							//cube = new THREE.LineSegments( new THREE.EdgesGeometry(geometry), material );
							//scene.add( cube );
						}, timeout, x, y, z, blocks[func(x, y, z)], textures[func(x, y, z)])
					}
				}
				timeout += timeoutDelta
			}
		}
	}
	addCubes()
	// Add light
	var color = 0xFFFFFF;
	var intensity = 1;
	var light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-world_size, 0.5 * world_size, world_size);
	light.target.position.set(0, 0, 0);
	scene.add(light);
	scene.add(light.target);

	// Add more light
	var color = 0xFFFFFF;
	var intensity = 0.5;
	light = new THREE.AmbientLight( color, intensity );
	scene.add(light);

	camera.position.z = world_size;
	camera.position.x = -world_size;
	camera.rotation.y = -45
	g = addCubes()

	const controls = new THREE.OrbitControls( camera, renderer.domElement );

	//controls.update() must be called after any manual changes to the camera's transform
	//camera.position.set( 0, 20, 100 );
	controls.update();
	renderer.render( scene, camera );
	var running = true
	var changed = true
	controls.addEventListener('change', (function () { changed = true }));
	function animate() {
		if (running) requestAnimationFrame( animate );
		if (changed || true) renderer.render( scene, camera );
		changed = false
		document.querySelector("#info_panel").children[0].children[0].innerText = scene.children.length
	}
	animate();
	return {
		cancel: (function () { running = false; renderer.domElement.remove(); }),
		scene, renderer, camera,
		elm: renderer.domElement
	};
}