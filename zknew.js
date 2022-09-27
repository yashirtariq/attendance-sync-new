const ZKLib = require('node-zklib')
const test = async () => {
let zkInstance = new ZKLib('192.168.1.201', 4370, 5200, 5000);
try {
    // Create socket to machine
    await zkInstance.createSocket()


    // Get general info like logCapacity, user counts, logs count
    // It's really useful to check the status of device

    console.log(await zkInstance.getInfo())
  } catch (e) {
    console.log(e)
    if (e.code === 'EADDRINUSE') {
    }
}


// Get users in machine

const users = await zkInstance.getUsers()
console.log(users)


// Create new user: setUser(uid, userid, name, password, role = 0, cardno = 0)

await zkInstance.setUser(12, '9', 'testing', '111', 0, 0);


// Get all logs in the machine
// Currently, there is no filter to take data, it just takes all !!

const logs = await zkInstance.getAttendances(function() {
   if (err) throw err;
   console.log("Very cool!");
})
console.log(logs)



// You can also read realtime log by getRealTimelogs function

await zkInstance.getRealTimeLogs((data)=>{
    // do something when some checkin
    console.log(data)
})
}