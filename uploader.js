async function uploadJSON() {
	// 1. Upload file
	var e = document.createElement("input")
	e.setAttribute("type", "file")
	e.click()
	while (e.files.length == 0) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}
	// 2. Convert the file to text
	var t = await e.files[0].text()
	// 3. Attempt to parse JSON
	var world = JSON.parse(t)
	// 4. Load the world
	window.world = world
	var i = await render(textures, world)
	window.cancel = i.cancel
	window.scene = i.scene
	window.renderer = i.renderer
	window.camera = i.camera
	document.body.appendChild(i.elm);
}