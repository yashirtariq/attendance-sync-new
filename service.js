var Service = require('node-windows').Service;
var svc = new Service({
 name:'Attendance-App',
 description: 'CMC M-TECH',
 script: 'E:\attendance sync software\node-zklib\test.js'
});

svc.on('install',function(){
 svc.start();

});

svc.install();


//for uninstall

// var Service = require('node-windows').Service;
// var svc = new Service({
//  name:'Attendance-App',
//  description: 'CMC M-TECH',
//  script: 'E:\attendance sync software\node-zklib\test.js'
// });

// svc.on('uninstall',function(){
// //  svc.start();
// console.log('uninstall complete')
// });

// svc.uninstall();