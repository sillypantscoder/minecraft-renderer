(() => {
	var world = []
	// Populate world with zeros
	for (var x = 0; x < world_size; x++) {
		world.push([])
		for (var y = 0; y < max_height; y++) {
			world[world.length - 1].push([])
			for (var z = 0; z < world_size; z++) {
				world[world.length - 1][world[world.length - 1].length - 1].push(0)
			}
		}
	}
	// Draw ground
	for (var x = 0; x < world_size; x++) {
		for (var z = 0; z < world_size; z++) {
			var column = window.vector_level[x][z]
			for (var y = 0; y < column.height; y++) {
				world[x][y][z] = 1
			}
		}
	}
	window.world = world
})();