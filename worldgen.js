(() => {
	var world = []
	var biomes = []
	for (var i = 0; i < n_biomes; i++) {
		var height = logical_height + (Math.random() * biome_shift) + (biome_shift * -0.5)
		var x = Math.round(Math.random() * world_size)
		var y = Math.round(Math.random() * world_size)
		var biome = {x, y, height: Math.round(height)}
		biomes.push(biome)
	}
	function getNearestBiome(x, y) {
		var rbiome = logical_height
		var dist = world_size * world_size
		for (var i = 0; i < biomes.length; i++) {
			var dist_x = biomes[i].x - x
			var dist_y = biomes[i].y - y
			var dist_n = Math.sqrt((dist_x * dist_x) + (dist_y * dist_y))
			if (dist_n < dist) {
				dist = dist_n
				rbiome = biomes[i].height
			}
		}
		return rbiome
	}
	var currentHeight = 5
	for (var x = 0; x < world_size; x++) {
		world.push([])
		for (var y = 0; y < world_size; y++) {
			var goto = [currentHeight, logical_height, getNearestBiome(x, y)]
			// Avg with previous blocks
			if (world[world.length - 1] && world[world.length - 1][y - 1]) goto.push(world[world.length - 1][y - 1].height)
			if (world[world.length - 2] && world[world.length - 2][y]) goto.push(world[world.length - 2][y].height)
			// Add to world
			var total = 0
			for (var i = 0; i < goto.length; i++) total += goto[i]
			currentHeight = total / goto.length
			var c_block = {
				height: Math.round(currentHeight),
				tree: null
			}
			if (Math.random() < 0.004) {
				c_block.tree = {
					height: Math.round(Math.random() * 3) + 3
				}
			}
			world[world.length - 1].push(c_block)
		}
	}
	window.vector_level = world
})();