





// claimer
Game.spawns["Spawn1"].spawnCreep([MOVE, MOVE, CLAIM, CLAIM], "Claimer_0", { memory: { role: 'claimer', TYPE: 'special', ROOM: "W8N3" } });



// if you need to force another harvester for some reason
Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], "Extra-Harv_0", { memory:{ role: 'harvester', TYPE: 'basic', ROOM: "W6N1"} });


