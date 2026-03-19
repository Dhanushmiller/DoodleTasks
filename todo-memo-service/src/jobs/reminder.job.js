const cron = require("node-cron");
const db = require("../config/db");
const sendEmail = require("../utils/email");

cron.schedule("0 * * * *", () => {

 console.log("Checking for upcoming tasks...");

 const query =
 "SELECT users.email, todos.task_name, todos.expiry \
 FROM todos \
 JOIN users ON todos.user_id = users.id \
 WHERE todos.expiry <= DATE_ADD(NOW(), INTERVAL 10 MINUTE) \
 AND todos.completion_status=false \
 AND todos.is_deleted=false";

 db.query(query,(err,results)=>{

   if(err){
     console.log("Cron error",err);
     return;
   }

   results.forEach(task=>{

     const message =
     `Reminder: Your task "${task.task_name}" expires at ${task.expiry}`;

     sendEmail(task.email,"Task Reminder",message);

   });

 });

});