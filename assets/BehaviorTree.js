//Don't modify this if you want to re-modify the behaviortree in the future
//#########################################{"class":"go.TreeModel","nodeDataArray":[{"catagory":"Composite","color":"lightgreen","key":-1,"loc":"259 119","name":"Root","parameter":"{}","src":"icon/root.svg","textEditable":false,"type":"Root"},{"catagory":"Action","color":"lightcoral","key":-2,"loc":"353 147","name":"Attack","parameter":"{}","parent":-1,"src":"icon/customaction.svg","textEditable":true,"type":"Action"}]}#############################################


cc.Class({
extends: cc.Component,
editor: {
inspector: 'packages://behaviortree-editor/bt-inspector.js'
},
properties: {
},
onLoad: function () {
let b3 = require('b3core.0.1.0module');
let self = this;
let  Attack = b3.Class(b3.Action);
Attack.prototype.name = 'Attack';
Attack.prototype.__Action_initialize = Attack.prototype.initialize;
Attack.prototype.initialize = function(settings){
         settings = settings || {};
         this.__Action_initialize();
         this.parameter = settings.parameter;
}
Attack.prototype.enter = function(tick){
           return self.getComponent('Attack').enter(tick,b3,this);
}
Attack.prototype.open = function(tick) {
           return self.getComponent('Attack').open(tick,b3,this);
}
Attack.prototype.tick = function(tick) {
           return self.getComponent('Attack').tick(tick,b3,this);
}
Attack.prototype.close = function(tick) {
           return self.getComponent('Attack').close(tick,b3,this);
}
Attack.prototype.exit = function(tick) {
           return self.getComponent('Attack').exit(tick,b3,this);
}
let tree = new b3.BehaviorTree();
tree.root = new b3.Sequence({parameter:{},children:[new Attack({parameter:{}})]});
this.tree = tree;
this.blackboard = new b3.Blackboard();
this.b3 = b3;
},
tick: function(target){
let t = {};
if(target != undefined){t = target;}
this.tree.tick(t,this.blackboard)
}});
