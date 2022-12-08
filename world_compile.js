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
	// Draw trees
	for (var x = 0; x < world_size; x++) {
		for (var z = 0; z < world_size; z++) {
			var column = window.vector_level[x][z]
			if (column.tree) {
				// Trunk
				var treeHeight = column.tree.height
				for (var y = column.height; y < column.height + column.tree.height + 1; y++) {
					world[x][y][z] = 3
				}
				// Leaves
				var w = 2 + Math.round(Math.random() * 3)
				var treetop = column.height + treeHeight
				for (var cx = x - w; cx < x + w + 1; cx++) {
					for (var cy = treetop - (w + w); cy < treetop + w + w; cy++) {
						for (var cz = z - w; cz < z + w + 1; cz++) {
							// Check if in bounds
							if (cx > 0 && cx < world_size && cy > 0 && cy < max_height && cz > 0 && cz < world_size) {
								// Check if in sphere
								if (Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - treetop, 2) + Math.pow(cz - z, 2)) < w) {
									if (world[cx][cy][cz] == 0) {
										world[cx][cy][cz] = 4
									}
								}
							}
						}
					}
				}
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
	// Convert grass to dirt where needed
	for (var x = 0; x < world_size; x++) {
		for (var y = 0; y < max_height; y++) {
			for (var z = 0; z < world_size; z++) {
				if (world[x][y][z] == 1 && world[x][y + 1] && world[x][y + 1][z] != 0) {
					world[x][y][z] = 2
				}
			}
		}
	}
	// Save
	window.world = world
})();