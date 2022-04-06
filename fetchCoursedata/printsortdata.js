const my_json_file = require("./course_data1.json") // use the require method


function reader(){
  
   for (let i = 1; i < my_json_file.length; i++){
       console.log(my_json_file[i].summary);
   }
}

module.exports = {reader}