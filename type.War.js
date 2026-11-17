var WarCreep = {
    run: function (creep) {
        
        const targetRoom = creep.memory.ROOM;
        const LocX = 42;
        const LocY = 48;

        
        // PIN for wariors
        var slot = 1; 
        
        if (creep.memory.role === "defender") {
            slot = 1;
            
        } else if (creep.memory.role === "killer") {
            slot = 2;
            
        } else if (creep.memory.role === "dummy") {
            slot = 3;
            
        }
        
                    
        // Defender logic
        if (slot == 1) {

            // Attack hostile creeps
            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            
            // if safe, go here and heal
            } else {
                creep.moveTo(new RoomPosition(LocX, LocY, targetRoom));
                if (creep.hits < creep.hitsMax) {
                    creep.heal(creep); 
                }
            }

        }

 
        // killer logic
        if (slot == 2) {
        
            // Priority of what is a target
            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => structure.structureType === STRUCTURE_EXTENSION || 
                                           structure.structureType === STRUCTURE_TOWER || 
                                           structure.structureType === STRUCTURE_SPAWN
                });
            }
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            }
            
            // attack the target
            if (target) {
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                
            // if no target heal in center of room
            } else {
                creep.moveTo(new RoomPosition(LocX, LocY, targetRoom)); 
                if (creep.hits < creep.hitsMax) {
                    creep.heal(creep);
                }
            }

        }
        

        // Dummy logic
        if (slot == 5) {
            creep.moveTo(new RoomPosition(LocX, LocY, targetRoom));
            if (creep.hits < creep.hitsMax) {
                creep.heal(creep); 
            }

        }


        
    }
};

module.exports = WarCreep;
