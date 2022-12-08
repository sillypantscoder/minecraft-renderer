// Download model
function download_gltf() {
	// Instantiate a exporter
	const exporter = new THREE.GLTFExporter();
	// Parse the input and generate the glTF output
	exporter.parse(
		scene,
		// called when the gltf has been generated
		function ( gltf ) {
			console.log( gltf );
			downloadBlob(new Blob([JSON.stringify( gltf )]))
		},
		// called when there is an error in the generation
		function ( error ) {
			console.log( 'An error happened' );
		},
		{}
	);
}
function download_stl() {
	// Instantiate a exporter
	const exporter = new THREE.STLExporter();
	// Parse the input and generate the STL output
	stl = exporter.parse(scene);
	// Save the file
	downloadBlob(new Blob([stl]), "landscape.stl")
}
function download_png() {
	renderer.render( scene, camera );
    const dataURL = renderer.domElement.toDataURL( 'image/png' );

    let a = document.createElement( 'a' ); // Create a temporary anchor.
    a.href = dataURL;
    a.download = 'export.png';
    a.click(); // Perform the navigation action to trigger the download.
}
function downloadBlob(blob, name = 'landscape.gltf') {
	// Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
	const blobUrl = URL.createObjectURL(blob);
	// Create a link element
	const link = document.createElement("a");
	// Set link's href to point to the Blob URL
	link.href = blobUrl;
	link.download = name;
	// Append link to the body
	document.body.appendChild(link);
	// Dispatch click event on the link
	// This is necessary as link.click() does not work on the latest firefox
	link.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		})
	);

	// Remove link from body
	document.body.removeChild(link);
}