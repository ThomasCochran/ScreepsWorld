module.exports.run = function () {
    
    // Iterate over all spawns
    for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        const SpawnsName = spawn.name; 
        

        // Check the name of the spawn and execute specific code
        if (spawn.name === "Spawn1") {
            
            const spawnNumber = 1;
            
            var WAR = false;
            var WarRoom = "E8N7";
            
            var NewWorld = false;
            var NewRoomName = "W8N3";
            
            var Hauler = true;
            var HaulerRoomName = "W7N1";
            var HaulerRoomName2 = "W7N1";//"W6N2";
            
            var LAB = false;
            var LINK = true;
            var BASIC = true;
            
            SpawnCode(SpawnsName,spawnNumber, WAR,WarRoom, NewWorld,NewRoomName, Hauler,HaulerRoomName,HaulerRoomName2, LAB,LINK,BASIC);


        } else if (spawn.name === "Spawn2") {
            
            const spawnNumber = 2;
            
            var WAR = false;
            var WarRoom = "E8N7";
            
            var NewWorld = false;
            var NewRoomName = "W8N3";
            
            var Hauler = true;
            var HaulerRoomName = "W8N2";
            var HaulerRoomName2 = "W7N3";
            
            var LAB = false;
            var LINK = false;
            var BASIC = true;
            
            SpawnCode(SpawnsName,spawnNumber, WAR,WarRoom, NewWorld,NewRoomName, Hauler,HaulerRoomName,HaulerRoomName2, LAB,LINK,BASIC);


        }
    }
    
    
    // This is for places I only want to keep, not maintain
    function Min_SpawnCode(spawnNumber, SpawnsName) {
        const spawn = Game.spawns[SpawnsName];
        var SpawnRoom = spawn.room;
        
        // Make needed Creeps
        if (!Game.creeps[`harvester_${spawnNumber},1`]) {
            Game.spawns[SpawnsName].spawnCreep([WORK, CARRY, MOVE], `harvester_${spawnNumber},1`, { memory: { role: 'harvester', TYPE: 'basic', ROOM: SpawnRoom } });
        } else if (!Game.creeps[`upgrader_${spawnNumber},1`]) {
            Game.spawns[SpawnsName].spawnCreep([WORK, CARRY, MOVE], `upgrader_${spawnNumber},1`, { memory: { role: 'upgrader', TYPE: 'basic', ROOM: SpawnRoom } });
        }
    }
    
    // set up SpawnCode
    function SpawnCode(SpawnsName,spawnNumber, WAR,WarRoom, NewWorld,NewRoomName, Hauler,HaulerRoomName,HaulerRoomName2, LAB,LINK,BASIC) {
        
        
         //  -- Common Variables --
         
        const spawn = Game.spawns[SpawnsName];
        var SpawnRoom = spawn.room;
        var SpawnRoomName = String(spawn.room.name);
        var SpawnRoomName = spawn.room.name;
        var Name = "BLANK";
        var Body = [];
        const storageNeedsEnergy = Game.rooms[SpawnRoomName].storage && 
                          Game.rooms[SpawnRoomName].storage.store[RESOURCE_ENERGY] < 
                          Game.rooms[SpawnRoomName].storage.store.getCapacity(RESOURCE_ENERGY) / 3;
        
        
        // run once ever 10 ticks (minuite)
        if (Game.time % 5 === 0) {
            
            //  -- Common Variables --
            
            const controller = SpawnRoom.controller;  // Get the controller object for the room
            const RoomLevel = controller.level;
            

        
            // Find all the energy stored in extensions and spawn
            let totalEnergy = 0;
            const extensions = SpawnRoom.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_EXTENSION
            });
            const spawns = SpawnRoom.find(FIND_MY_SPAWNS);
            for (let extension of extensions) {
                totalEnergy += extension.store[RESOURCE_ENERGY];
            }
            for (let spawn of spawns) {
                totalEnergy += spawn.store[RESOURCE_ENERGY];
            }
            
    
            // Determine the maximum usable energy based on extensions
            const Extensions = SpawnRoom.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).length;
            var ExtraEnergy = 100 + Extensions * 50;

            
            // -- Creep Spawn Chacklist --
            
            let Check = [false, false, false, false, false, false];
            
            
            // Basic spawn
            if (BASIC) {
                // Spawn Harvistor0 if all other Harvesters are dead
                if (SpawnRoom && _.filter(SpawnRoom.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'harvester').length === 0) {
                    Game.spawns[SpawnsName].spawnCreep([WORK, CARRY, MOVE], `harvester_${spawnNumber},0`, { memory:{ role: 'harvester', TYPE: 'basic', ROOM: SpawnRoomName} });
                }
                
                
                // Make needed Creeps
                if (!Game.creeps[`harvester_${spawnNumber},1`]) {
                    const Name = `harvester_${spawnNumber},1`;
                    Body = Build_Basic_Creep(ExtraEnergy);
                    Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'harvester', TYPE: 'basic', ROOM: SpawnRoomName } });
                    
                } else if (!Game.creeps[`upgrader_${spawnNumber},1`]) {
                    const Name = `upgrader_${spawnNumber},1`;
                    Body = Build_Basic_Creep(ExtraEnergy);
                    Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'upgrader', TYPE: 'basic', ROOM: SpawnRoomName } });
                    
                } else if (!Game.creeps[`harvester_${spawnNumber},2`]) {
                    const Name = `harvester_${spawnNumber},2`;
                    Body = Build_Basic_Creep(ExtraEnergy);
                    Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'harvester', TYPE: 'basic', ROOM: SpawnRoomName } });
                    
                } else if (!Game.creeps[`manager_${spawnNumber},1`]) {
                    const Name = `manager_${spawnNumber},1`;
                    Body = Build_Basic_Creep(ExtraEnergy);
                    Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'manager', TYPE: 'basic', ROOM: SpawnRoomName } });
                    
                // Extra Creeps for early game
                } else if (RoomLevel <= 4) {
                    if (!Game.creeps[`upgrader_${spawnNumber},2`]) {
                        const Name = `upgrader_${spawnNumber},2`;
                        Body = Build_Basic_Creep(ExtraEnergy);
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'upgrader', TYPE: 'basic', ROOM: SpawnRoomName } });
                        
                    } else if (RoomLevel <= 2) {
                        if (!Game.creeps[`builder_${spawnNumber},1`]) {
                            const Name = `builder_${spawnNumber},1`;
                            Body = Build_Basic_Creep(ExtraEnergy);
                            Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'builer', TYPE: 'basic', ROOM: SpawnRoomName } });
                        }
                    
                    } else {
                        Check[0] = true;
                    }
                    
                }  else {
                    Check[0] = true;
                }
                
            } else {
                Check[0] = true;
            }
            
            // Link spawn
            if (Check[0] == true) {
                if (LINK) {
                    
                    if (!Game.creeps[`Linker_${spawnNumber},1`]) {
                        const Name = `Linker_${spawnNumber},1`;
                        Body = Build_Basic_Creep(ExtraEnergy);
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'linker', TYPE: 'special', ROOM: SpawnRoomName } });
                        
                    } else {
                        Check[1] = true;
                    }
                    
                } else {
                    Check[1] = true;
                }
            }
            
            // Lab spawn
            if (Check[1] == true) {
                if (LAB) {
                    if (!Game.creeps[`Scientist_${spawnNumber},1`]) {
                        const Name = `Scientist_${spawnNumber},1`;
                        Body = Build_Basic_Creep(ExtraEnergy);
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'scientist', TYPE: 'special', ROOM: SpawnRoomName } });
                    } else {
                        Check[2] = true;
                    }
                    
                } else {
                    Check[2] = true;
                }
            }
                
            // War spawn
            if (Check[2] == true) {
                if (WAR) {
                    // Parts
                    var EXOSUIT = [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE]; // 300
                    var SANDBAG = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE] // 140
                    
                    var KNIFE = [MOVE, ATTACK]; // 130
                    //var GUN = [MOVE, RANGED_ATTACK] // 200
                    
                    //var MEDKIT = [MOVE, HEAL]; // 300
                    //var HEALTHBAG = [MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL] // 1,550
                    //var REGEN = [].concat(MEDKIT).concat(MEDKIT).concat(MEDKIT).concat(MEDKIT).concat(MEDKIT).concat(MEDKIT) // 1,800


                    // Body Types
                    let Dummy = [].concat(SANDBAG).concat(SANDBAG).concat(SANDBAG).concat(SANDBAG).concat(SANDBAG) // 700
                    //let FastDummy = [].concat(EXOSUIT).concat(EXOSUIT).concat(EXOSUIT) // 900
                    
                    //let TakeIt = [].concat(EXOSUIT).concat(EXOSUIT).concat(EXOSUIT).concat(EXOSUIT).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE);  // 1,850
                    let TakeIt_Mid = [].concat(EXOSUIT).concat(EXOSUIT).concat(KNIFE).concat(KNIFE).concat(KNIFE); // 990
                    let TakeIt_Mini = [].concat(EXOSUIT).concat(KNIFE); // 430
                    
                    //let Invaider_Mid = [].concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE).concat(KNIFE) // 1,560
                    //let Invaieder = [].concat(Invaider_Mid).concat(Invaider_Mid).concat(KNIFE) //3,250
                    
                    
                    if (!Game.creeps[`PleaseStop_${spawnNumber},1`]) {
                        const Name = `PleaseStop_${spawnNumber},1`;
                        Game.spawns[SpawnsName].spawnCreep(TakeIt_Mini, Name, { memory: { role: 'defender', TYPE: 'war', ROOM: WarRoom } });
                        
                    } else if (!Game.creeps[`PleaseStop_${spawnNumber},2`]) {
                        const Name = `PleaseStop_${spawnNumber},2`;
                        Game.spawns[SpawnsName].spawnCreep(TakeIt_Mini, Name, { memory: { role: 'defender', TYPE: 'war', ROOM: WarRoom } });
                        
                    } else {
                        Check[3] = true;
                    }
                    
                } else {
                    Check[3] = true;
                }
            }
            
            // Hauler Spawn
            if (Check[3] == true) {
                if (Hauler) {
                    
                    // site 1
                    
                    if (1==2){    //!Game.creeps[`Reserver_${spawnNumber},1`] && RoomLevel >= 4) {
                        const Name = `Reserver_${spawnNumber},1`;
                        Game.spawns[SpawnsName].spawnCreep([MOVE,MOVE,CLAIM,CLAIM], Name, { memory: { role: 'hauler', TYPE: 'special', ROOM: HaulerRoomName } });
                        
                    } else if (!Game.creeps[`Hauler_${spawnNumber},1`] && storageNeedsEnergy) {
                        const Name = `Hauler_${spawnNumber},1`;
                        Body = [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'hauler', TYPE: 'special', ROOM: HaulerRoomName } });
                        
                    } else if (!Game.creeps[`Hauler_${spawnNumber},2`] && storageNeedsEnergy) { 
                        const Name = `Hauler_${spawnNumber},2`;
                        Body = [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'hauler', TYPE: 'special', ROOM: HaulerRoomName } });
                        
                        
                    } else if (HaulerRoomName !== HaulerRoomName2) {
                        
                        // site 2
                        
                        if (1==2) {    //!Game.creeps[`Reserver_${spawnNumber},2`] && RoomLevel >= 4) {
                            const Name = `Reserver_${spawnNumber},2`;
                            Game.spawns[SpawnsName].spawnCreep([MOVE,MOVE,CLAIM,CLAIM], Name, { memory: { role: 'hauler', TYPE: 'special', ROOM: HaulerRoomName2 } });
                            
                        } else if (!Game.creeps[`Hauler_${spawnNumber},3`] && storageNeedsEnergy) {
                            const Name = `Hauler_${spawnNumber},3`;
                            Body = [WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                            Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'hauler', TYPE: 'special', ROOM: HaulerRoomName2 } });
                            
                        } else {
                            Check[4] = true;
                        }
                        
                    } else {
                        Check[4] = true;
                    }
                    
                } else {
                    Check[4] = true;
                }
            }
            
            // NewWorld Spawn
            if (Check[4] == true) {
                if (NewWorld) {
                    if (!Game.creeps[`Chis_Harv_${spawnNumber},1`]) {
                        const Name = `Chis_Harv_${spawnNumber},1`;
                        Body = [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK];
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'harvester', TYPE: 'basic', ROOM: NewRoomName } });
                        
                    } else if (!Game.creeps[`Chis_Up_${spawnNumber},1`]) {
                        const Name = `Chis_Up_${spawnNumber},1`;
                        Body = [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK];
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'upgrader', TYPE: 'basic', ROOM: NewRoomName } });
                        
                    } else if (!Game.creeps[`Chis_Harv_${spawnNumber},2`]) {
                        const Name = `Chis_Harv_${spawnNumber},2`;
                        Body = [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK];
                        Game.spawns[SpawnsName].spawnCreep(Body, Name, { memory: { role: 'harvester', TYPE: 'basic', ROOM: NewRoomName } });
                        
                    }  else {
                        Check[5] = true;
                    }
                    
                } else {
                    Check[5] = true;
                }
            }
            
            
        
            // Function to build a basic creep
            function Build_Basic_Creep(ExtraEnergy) {
                if (ExtraEnergy > 1100) {
                    ExtraEnergy = 1100;
                }
                var Body = [WORK, CARRY, MOVE];
                var Moves = 1;
                var Works = 1;
                var Carrys = 1;
        
                while (ExtraEnergy >= 50) {
                    if (ExtraEnergy >= 100) {
                        if (Works + Carrys >= Moves * 2) {
                            Body.push(MOVE);
                            ExtraEnergy -= 50;
                            Moves += 1;
                        } else {
                            if (Carrys * 3 >= Works) {
                                Body.push(WORK);
                                ExtraEnergy -= 100;
                                Works += 1;
                            } else {
                                Body.push(CARRY);
                                ExtraEnergy -= 50;
                                Carrys += 1;
                            }
                        }
                    } else {
                        if (Works + Carrys >= Moves * 2) {
                            Body.push(CARRY);
                            ExtraEnergy -= 50;
                            Carrys += 1;
                        } else {
                            Body.push(MOVE);
                            ExtraEnergy -= 50;
                            Moves += 1;
                        }
                    }
                }
                return Body;
            }
            
        }
        
        
        
        
//      -   -   Auto Buildin    -   -    

        if (Game.time % 100 === 0 ) {
                
            // Place extensions
            const maxRing = 20; // Maximum number of rings to check
            const center = spawn.pos;
            
            // Function to get the positions in a checkerboard pattern
            function getCheckerboardPositions(center, radius) {
                let positions = [];
                for (let dx = -radius; dx <= radius; dx++) {
                    for (let dy = -radius; dy <= radius; dy++) {
                        if (Math.abs(dx) + Math.abs(dy) === radius) {
                            // Checkerboard pattern: sum of coordinates should be even
                            if ((dx + dy) % 2 === 0) {
                                let x = center.x + dx;
                                let y = center.y + dy;
                                if (x >= 0 && x < 50 && y >= 0 && y < 50) { // Check if within room boundaries
                                    positions.push(new RoomPosition(x, y, center.roomName));
                                }
                            }
                        }
                    }
                }
                return positions;
            }
            
            let ringCount = 0;
            
            for (let ring = 1; ring <= maxRing; ring++) {
                let positions = getCheckerboardPositions(center, ring);
                for (let pos of positions) {
                    const structures = pos.lookFor(LOOK_STRUCTURES);
                    const constructionSites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
            
                    // Check if there's a structure other than a rampart
                    const hasNonRampartStructure = structures.some(structure => structure.structureType !== STRUCTURE_RAMPART);
            
                    if (!hasNonRampartStructure && constructionSites.length === 0) {
                        // Place a construction site for an extension
                        if (spawn.room.createConstructionSite(pos, STRUCTURE_EXTENSION) === OK) {
                            return;
                        }
                    }
                }
                ringCount++;
            }
    
            
            // Place Towers
            RoomLevel = spawn.room.controller.level;
            
            let Pos1 = new RoomPosition(spawn.pos.x - 3, spawn.pos.y, spawn.room.name);
            let Pos2 = new RoomPosition(spawn.pos.x, spawn.pos.y - 3, spawn.room.name);
            let Pos3 = new RoomPosition(spawn.pos.x + 3, spawn.pos.y, spawn.room.name);
            let Pos4 = new RoomPosition(spawn.pos.x, spawn.pos.y + 3, spawn.room.name);
            
            let towerCount = 0;
            const structures = spawn.room.find(FIND_STRUCTURES);
            for (const structure of structures) {
                if (structure.structureType === STRUCTURE_TOWER) {
                    towerCount++;
                }
            }

            if (RoomLevel >= 3 && towerCount < 1) {
                spawn.room.createConstructionSite(Pos1, STRUCTURE_TOWER);
            } else if (RoomLevel >= 5 && towerCount < 2) {
                spawn.room.createConstructionSite(Pos2, STRUCTURE_TOWER);
            } else if (RoomLevel >= 7 && towerCount < 3) {
                spawn.room.createConstructionSite(Pos3, STRUCTURE_TOWER);
            } else if (RoomLevel >= 8 && towerCount < 4) {
                spawn.room.createConstructionSite(Pos4, STRUCTURE_TOWER);
            }
            
            
            // Place ramparts
            const spawnPos = spawn.pos;
            const range = 4;
        
            // List of relative coordinates to check around the spawn for rampart placement
            const positions = [];
        
            // Loop to create a diamond perimeter of positions at a distance of 'range' from the spawn
            for (let dx = -range; dx <= range; dx++) {
                for (let dy = -range; dy <= range; dy++) {
                    // Only include positions that are exactly 'range' distance away in a diamond shape
                    if (Math.abs(dx) + Math.abs(dy) !== range) continue;
                    
                    const x = spawnPos.x + dx;
                    const y = spawnPos.y + dy;
        
                    // Skip positions that are out of bounds
                    if (x < 0 || x >= 50 || y < 0 || y >= 50) continue;
        
                    positions.push(new RoomPosition(x, y, spawnPos.roomName));
                }
            }
        
            // Add the spawn's position to the list for placing a rampart directly on it
            positions.push(spawnPos);
        
            // Iterate over all positions and attempt to place a rampart
            for (const pos of positions) {
                const result = pos.createConstructionSite(STRUCTURE_RAMPART);
                if (result !== OK) {
                   
                }
            }
            
            
            
        }
    }   
    
    
    
};