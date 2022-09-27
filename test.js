const ZKLib = require('./zklib')
var mongoose = require('mongoose');
const userModel = require('./models/users')
const SettingModel = require('./models/machinesettings')
const axios  = require('axios');
var cron = require('node-cron');
const FormData = require("form-data");
const moment = require("moment");
const { $where } = require('./models/users');


const checkInter = async () => {

    dnsCheck.lookup('192.168.10.183', function(err) {
if (err) {
console.log("No connection");
} else {
console.log("Internet Connected");
}
});
}

const test = async () => {
    mongoose.connect("mongodb+srv://admin:AmH_N6572@cluster0.hgjvd.mongodb.net/seghal?retryWrites=true&w=majority", {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected');
    let zkInstance = new ZKLib('192.168.10.183', 4370, 100000000, 4000);
    // await zkInstance.disconnect()
    // try {
        // Create socket to machine 
        await zkInstance.createSocket()
        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
       
        
   
    //     await zkInstance.getRealTimeLogs((data)=>{
    //         // do something when some chec kin
    //         console.log(data)
    //     })
    //   return true;
// return true;
// var info = await zkInstance.getInfo() 
// const logs = await zkInstance.getAttendances()
// let userss = await zkInstance.getUsers()
// console.log(info)

// return true;
// const logs = await zkInstance.getAttendances()
// console.log(logs);
// return true;
 
// return true;


    cron.schedule('*/5 * * * * *', async () => {
        const checker = await checkInter();
    if (checker == err) {
        await zkInstance.disconnect()
        let zkInstance = new ZKLib('192.168.10.183', 4370, 100000000, 4000);
        await zkInstance.createSocket()
        console.log("Waiting device handshake")
        callAttendance()

    }

    else{
        console.log('aaaaa')
        callAttendance()



    }
       
      });

    // delete the data in machine
    // You should do this when there are too many data in the machine, this issue can slow down machine 
    // zkInstance.clearAttendanceLog();
    
  
    // Disconnect the machine ( don't do this when you need realtime update :))) 
    
// } catch (e) {
//     console.log(e)
//     await zkInstance.disconnect()
//     if (e.code === 'EADDRINUSE') {
//         console.log('-----------')
//     }
// }
}

const saveUser = async (data) => {
    var new_user = new userModel({
        uid: data.uid,
            role: data.role,
            password: data.password,
            name: data.name,
            cardno: data.cardno,
            userId: data.userId
    })
    await new_user.save();
}

const st = async (users , att) => {
    if(att){
    var setting = await SettingModel.findOneAndUpdate({
  attendanceCounts: att
    })
}else{
    var setting = await SettingModel.findOneAndUpdate({
        usersCount: users,
    })
}
    // await setting.save();
}
const postData = async (url , data) => {
    const response = await axios({
        method: "post",
        url,
        data: data
    })
        .then((res) => res.data)
        .catch((error) => {
            console.log(error.message);
            const errData = { success: false, err: error.message };
            return errData;
        });

    return response;
}

test()

// const callAttendance = async () => {
   
//     var info = await zkInstance.getInfo()
//     console.log(info)
// var settings = await SettingModel.findOne().exec();
// if(info.userCounts > 1000){
//     return true;
// }



// console.log(info  , settings)
// // return true; 

//  // Get users in machine 

//     // To Save And Delete
//     if(info.userCounts > settings.usersCount){
//         const users = await zkInstance.getUsers()
//     for(let i=settings.usersCount; i<info.userCounts; i++){
//     let machineUser = await userModel.findOne({uid: users.data[i].uid}).exec()
//     if(!machineUser){
//         console.log(users.data[i])
//         saveUser(users.data[i])
//     }
//     }
//     st(info.userCounts , null);
// }
// console.log(info.logCounts > settings.attendanceCounts)
//     if(info.logCounts > settings.attendanceCounts){
//         let logs = await zkInstance.getAttendances()
//         console.log(logs);
//         st(null , info.logCounts);
//         let attend = [];
         
//         for(let i=settings.attendanceCounts; i<info.logCounts; i++){
//             let machineUser = await userModel.findOne({userId: logs.data[i].deviceUserId}).exec()
//             console.log(machineUser)
//             console.log(logs.data[i])
//             let d = new Date(logs.data[i].recordTime);
//            let e = moment(logs.data[i].recordTime)
//            //    .add(2, 'hours')
//               .format('DD/MM/YYYY HH:mm:ss')
//             // let d = new Date(logs.data[i].recordTime);
            
// let date = d.getDate();
// let month = (d.getMonth() + 1).toString().padStart(2, "0"); // Since getMonth() returns month from 0-11 not 1-12
// let year = d.getFullYear();
// let dateStr = year + "-" + month + "-" + date;


// let time = d.getHours().toString().padStart(2, "0")+":"+d.getMinutes().toString().padStart(2, "0")+":"+d.getSeconds().toString().padStart(2, "0");
// // console.log(d , time , dateStr)


//             let userobj = {
//                 "UserId": logs.data[i].deviceUserId,
//                 "TimeStamp": e,
//                 "StudentId": logs.data[i].deviceUserId,
//                 "UserId": logs.data[i].deviceUserId,
//                 "Date":  dateStr,
//                 "TimeIn": time,
//                 "TimeOut": time,
//                 "AttendanceId": logs.data[i].deviceUserId,
//                 "DeviceId": logs.data[i].deviceUserId,
//                 "CardNo": machineUser.cardno,
                
//             }
//             // console.log(userobj , 'sdfsdfdsfsf')
//             // userobj = (userobj);
//             // console.log(userobj)
//             let apiData = await postData("https://api.thebravegym.com/new.php" ,userobj )
//             console.log(apiData , 'after response')
//         }
      
//     }
// }