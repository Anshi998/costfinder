var pool = require('./db');
//var fxn= require('./fxn')
var jwt = require('jsonwebtoken');
var jwtkey = "supersecretkey";
//const emp_jwtkey='supersecretkey_employe'


module.exports = {

    auth:function(req,res,next)
    {
       var token;
      if(req.token || req.body.token || req.query.token || req.headers['x-access-token'])
      {
        token = req.token || req.body.token || req.query.token || req.headers['x-access-token'];
        // console.log('token1'+token)
      }
      else if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'  && req.headers.authorization.split(' ')[1]) 
      {
        token = req.headers.authorization.split(' ')[1];
        // console.log('token2'+token)
       }
      else if(req.cookies && req.cookies.token) 
      {
        token =req.cookies.token;
        // console.log('token3'+token)
      }
      if (token) 
      {
        jwt.verify(token,jwtkey,{ algorithms: ['HS384'] },function(err, decoded)
        {
          if (err) 
          {
            console.log(err);
            return res.status(401).json({"success":false,'msg':'user login page'});
          }
          else
          {
            req.user_id = decoded.user_id;
            req.decoded = decoded;
            req.token=token;
            // console.log(decoded);
            // req.decoded = decoded;
            // req.token=token;
            // //req.locals.role_id=decoded.role_id;
            console.log(decoded);
            //expand token time
            // res.cookie('token',token, {maxAge: 60*60*1000, httpOnly: true });
           
            next(); //no error, proceed
          }
        });
      } 
      else 
      {
        return res.status(403).json({"success":false,'msg':'user login page'});
      }
    },

  //  emp_auth:(req,res,next)=>
  //   {
  //      var token;
  //     if(req.token || req.body.token || req.query.token || req.headers['x-access-token'])
  //     {
  //       token = req.token || req.body.token || req.query.token || req.headers['x-access-token'];
  //       // console.log('token1'+token)
  //     }
  //     else if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
  //     {
  //       token = req.headers.authorization.split(' ')[1];
  //       // console.log('token2'+token)
  //     }
  //     else if(req.cookies && req.cookies.token) 
  //     {
  //       token =req.cookies.token;
  //       // console.log('token3'+token)
  //     }
  //     if (token) 
  //     {
  //       jwt.verify(token,emp_jwtkey,{ algorithms: ['HS384'] },function(err, decoded)
  //       {
  //         if (err) 
  //         {
  //           console.log(err);
  //           return res.status(500).json({"success":false,'msg':'user login page'});
  //         }
  //         else
  //         {
  //           // console.log(decoded);
  //           req.userId = decoded.id;
  //           req.decoded = decoded;
  //           req.token=token;
  //           //expand token time
  //           // res.cookie('token',token, {maxAge: 60*60*1000, httpOnly: true });
  //           next(); //no error, proceed
  //         }
  //       });
  //     } 
  //     else 
  //     {
  //       return res.status(403).json({"success":false,'msg':'user login page'});
  //     }
  //   },

//=>    
    
    // company_dashboard: function(req,res,next) 
    // {
    //   var sql="select `company_id`, `company_name`, `company_detail`, `company_user_name` from company where ? and ?";
    //   var sql_arr = new Array();
    //   sql_arr[0]={company_status:1}
    //   sql_arr[1]={company_id:req.decoded.company_id}

    //       pool.query(sql,sql_arr)
    //       .then((companyresult,fields)=>
    //       {
    //         // console.log(companyresult);
    //         res.status(200).json({"success":true,'msg':'company dashboard','companydata':companyresult,'tokenKey':req.token });    
    //       })        
    //  .catch(err=> fxn.handleError(err,'server err',req,res));
    // },

    // employe_dashboard: function(req,res,next) 
    // {
    //   var sql="select `employe_id`, `employe_name`, `employe_alias`, `employe_mobile`, `employe_email`, `employe_user_name` from employe where ? and ?";
    //   var sql_arr = new Array();
    //   sql_arr[0]={employe_status:1}
    //   sql_arr[1]={employe_id:req.decoded.employe_id}
    //       pool.query(sql,sql_arr)
    //       .then((employe_result,fields)=>
    //       {
    //         // console.log(employeresult);
    //         res.status(200).json({"success":true,'msg':'employe dashboard','employe_data':employe_result,'tokenKey':req.token });    
    //       }) 
    //  .catch(err=> fxn.handleError(err,'server err',req,res));
    // },

    
}         
