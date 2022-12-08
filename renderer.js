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
			blocks.push([
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].side)}),
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].side)}),
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].top)}),
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].bottom)}),
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].side)}),
				new THREE.MeshPhongMaterial({map: loader.load('/textures/' + textures[i].side)}),
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
						setTimeout((x, y, z, material) => {
							var geometry = new THREE.BoxGeometry(1, 1, 1);
							geometry.translate(x - (world_size / 2), y - (world_size / 2), z - (world_size / 2))
							var color = 0xFFFFFF
							// Add cube
							//var material = new THREE.MeshPhongMaterial({ color: color });
							var cube = new THREE.Mesh( geometry, material );
							scene.add( cube );
							// Add wireframe
							//var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
							//cube = new THREE.LineSegments( new THREE.EdgesGeometry(geometry), material );
							//scene.add( cube );
						}, timeout, x, y, z, blocks[func(x, y, z)])
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
	//renderer.render( scene, camera );
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		//document.querySelector("#objcount").innerText = scene.children.length
	}
	animate();
	return renderer.domElement;
}