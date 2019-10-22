


const crypto = require('crypto');
var pool = require('./db');
// crypto.DEFAULT_ENCODING = 'hex';

// var password='temppass';
// var config = {

//   salt:'edonomixsaltforhashpassword',
//   iterations: 20000,
//   hashBytes: 32, 
//   digest: 'sha256'
// };

module.exports ={

       mysqlExecute:(sql,data)=> 
  {
      return new Promise(async(resolve, reject)=>
      {

        try
        {
           pool.query(sql)
          .then((sql_result,fields)=>
          {
            resolve(sql_result);
          })
          .catch(err => {console.log("code"+err.code);})
        }
        catch(err)
        {
          console.log("code"+err.code);
          reject(err);
        }
        finally
        {

        }

      });
    
         

  },
    
    
//this function is a general error handler
handleError:(err, msg, req,res)=>{
    // console.log(err);
    if(msg == undefined){
        msg = "there was some error at the server";
    }
     res.status(500).json({
        success:false,
        msg: msg,
        err:err
    });
},
hashPassword:function(password)
{
    if(!password){password='1*==ParagDineshGupta==*1';} 
    const key = crypto.pbkdf2Sync(password,'edonomixsaltforhashpassword', 20000,32,'sha256');
    console.log(key.toString('hex'));  
    return(key.toString('hex'));
},
isEmpty:function(obj) 
{
    return Object.keys(obj).length === 0;
},
nextDate:function(sd,freq) 
{
    var arr = sd.split("-");
    var m=parseInt(arr[1]);
    var y=parseInt(arr[0]);
    var d=parseInt(arr[2]);
    var f=parseInt(freq);
    var x=m+f;
    var def_y=parseInt(x/12);
    y=y+def_y;
    var def_m=x%12;
    m=def_m;
    if(x==12)
    {y=y-1;
    m=m+12;}
    if(m<10)
    m='0'+m;
    return(y+'-'+m+'-'+d);    
},
uploadFile:function(file,filepath){      
        //file = req.files.filenameinform;
        file.name= Date.now() + "_" + file.name; 
        file.mv(filepath+"/"+file.name, function(err){
         if(err) throw err;
         else{
         	return 1;
         }
     });
},
isCubeBroken:function(cubeRefNo){
       const sqlQuery="SELECT loads from cube_testing WHERE cube_ref_no=`cubeRefNo`";
   
  pool.query(sqlQuery,[req.body.code])
  .then((result)=>{
        console.log(result);
        return result;
          // next();
    
  })
  .catch(error => {fxn.handleError(error,'server err',req,res)})

},
getCubeNosforCubeTestId:function(cubeTestId){
       const sqlQuery="SELECT cubeRefNo from cube_testing WHERE id=`cubeTestId`";
   
  pool.query(sqlQuery,[req.body.code])
  .then((result)=>{
        console.log(result);
        return result;
          // next();
    
  })
  .catch(error => {fxn.handleError(error,'server err',req,res)})

}      

},
       
       function createDate(x=0){
    let m = new Date();
    let n = new Date();
    n.setDate(m.getDate()-x);
    
    let newDate =
        n.getUTCFullYear() + "-" +
        ("0" + (n.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + n.getUTCDate()).slice(-2) + " " +
        ("0" + n.getUTCHours()).slice(-2) + ":" +
        ("0" + n.getUTCMinutes()).slice(-2) + ":" +
        ("0" + n.getUTCSeconds()).slice(-2);
    
    return newDate;

}
// console.log(createDate(7));
