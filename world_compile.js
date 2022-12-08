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
				var treetop = column.height + treeHeight
				var locs = [[x, treetop, z]]
				for (var i = 0; i < 3000; i++) {
					var last = locs[locs.length - 1]
					last[0] += Math.round((Math.random() - 0.5) * 1.3)
					last[1] += Math.round((Math.random() - 0.5) * 1.3)
					last[2] += Math.round((Math.random() - 0.5) * 1.3)
					if (last[0] < x) last[0] += Math.round(Math.random())
					if (last[0] > x) last[0] -= Math.round(Math.random())
					if (last[2] < z) last[2] += Math.round(Math.random())
					if (last[2] > z) last[2] -= Math.round(Math.random())
					if (last[1] < treetop) last[1] += Math.round(Math.random())
					if (last[1] > treetop) last[1] -= Math.round(Math.random())
					locs.push([last[0], last[1], last[2]])
				}
				for (var i = 0; i < locs.length; i++) {
					var c = locs[i]
					if (c[0] < 0 || c[1] < 0 || c[2] < 0) continue
					if (c[0] >= world_size || c[1] >= max_height || c[2] >= world_size) continue
					if (world[c[0]][c[1]][c[2]] == 0) {
						world[c[0]][c[1]][c[2]] = 4
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
	// Draw water
	for (var x = 0; x < world_size; x++) {
		for (var z = 0; z < world_size; z++) {
			var column = window.vector_level[x][z]
			for (var y = column.height; y < water_height; y++) {
				world[x][y][z] = 5
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