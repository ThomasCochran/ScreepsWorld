var spawnScript = require('Spawn.js');
var UtilityLogic = require('./Utility.js');
var BasicCreep = require("type.Basic");
var WarCreep = require("type.War");
var SpecialCreep = require("type.Special");

module.exports.loop = function () {
    
    //console.log("tick");
    
    // Check CPU
    //if (Game.time % 20 === 0) {
        //.cpu.generatePixel();
        //console.log(" - ");
    //   console.log(` - CPU bucket: ${Game.cpu.bucket} - `);
    //}
    

    // Loop through all structures and run UtilityLogic if they match the desired types
    for (const structure of Object.values(Game.structures)) {
            UtilityLogic.run(structure);
    }


    // Creeps
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.TYPE === "basic") {
            BasicCreep.run(creep);
        }
        else if (creep.memory.TYPE === "war") {
            WarCreep.run(creep);
        } 
        else if (creep.memory.TYPE === "special") {
            SpecialCreep.run(creep);
        }
    }

    // Iterate over all spawns in the game
    for (const spawnName of Object.keys(Game.spawns)) {
        const spawn = Game.spawns[spawnName]; // Get the spawn object using the spawn name
        if (spawn) {
            spawnScript.run(spawn);
        }
    }
    
    // TITS  Terminaly ill transit system
    if (!Memory.TerminalOrder) {
        Memory.TerminalOrder = [0 ,""];
    }

    
    
    
    // Terminal order
    Memory.TerminalOrder;

   Memory.TerminalOrder[0] = 0;
   //Memory.TerminalOrder[1] = "W12S14";
   //Memory.TerminalOrder[2] = "W13S13";
   
   
    
    
    //    -   -   TO Do List   -   -   
    
    // Fancy makecreep function with for i loop on numbers? like makeHarv(3) ???
    
    
    
    // Hauler section under spawn also makes more Harvesters & upgraders ??
    
    // Change funky Hualer into Claimer
    
    // Haulers if have energy in second room --> build/repair
    
    
    
    // Make TerminalOrder more versitile
    
    // Attackers should target extentions first
    
    // If have nuker get godium // fill nuker with godium
    
    
    
    
    
    //    -   -   Tips to look into   -   - 
     
    // Game.notify
    
    //  A good way to save CPU is caching often-used paths.
    
    
    
    
};
