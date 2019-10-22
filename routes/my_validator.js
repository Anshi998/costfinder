// The body function will only validate req.body and takes two arguments. First is the property name.
// Second is your custom message that will be shown if validation fails.
// If you don’t provide a custom message, then the default message will be used.


const { body,header,query,param,cookie } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter');
// body({
//   customValidators: {
//      isArray: function(value) {
//         return Array.isArray(value);
//      },
//      notEmpty: function(array) {
//         return array.length > 0;
//      },
//      gte: function(param, num) {
//         return param >= num;
//      }
//   }
// });
exports.validate = (method) => {
switch (method) {

    case 'company': {
     
     return [ 
        body('ui_name', 'Name Required').exists().isLength({min:1}),
        body('ui_detail', 'Detail Required').exists().isLength({min:1}),
        body('ui_user_name', 'User name Required').exists().isLength({min:1}),
        // body('ui_profile_pic', 'Profile picture Required').exists().isLength({min:1}),
        body('ui_email', 'Invalid email').optional({checkFalsy:true}).isEmail(),
        body('ui_mobile','Invalid mobile, 10 number is required').optional({checkFalsy:true}).isInt().isLength({min:10}),
        // body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }

    case 'login': {
     return [ 
        body('ui_user_name', 'User Name must have at least 4 character').exists().isLength({min:4}),
        body('ui_password', 'Password must have at least 4 character').exists().isLength({min:4})
         .not().isIn(['1234', 'password', 'abcd']).withMessage('Do not use a common word as the password')
        .matches(/\d/).withMessage('Password must contain at least one integer')
       ]   
    }
    case 'change_password': {
     return [ 
        body('ui_user_name', 'User Name Required').exists().isLength({min:1}),
        body('ui_old_password', 'Insert Proper Old Password').exists().isLength({min:4}),
        body('ui_new_password', 'New password must have at least 4 character').exists().isLength({min:4})
        .not().isIn(['1234', 'password', 'abcd']).withMessage('Do not use a common word as the password')
        .matches(/\d/).withMessage('Password must contain a number')
       ]   
    }

    case 'employe': {
     return [ 
        // body('ui_product_type_description', 'description Required').exists().isLength({min:1}),
        body('ui_employe_name', 'Employee must have at least 2 character').exists().isLength({min:2}),
        // body('ui_employe_alias', 'Employee Alias must have at least 1 character').optional({checkFalsy:true}),
        body('ui_location_id', 'Invalid location').isInt(),
        body('ui_dept_id', 'Invalid Department').isInt(),
        body('ui_doj', 'Invalid date of joining').isISO8601().withMessage('Date formate is yyyy-mm-dd')
        // body('ui_email', 'Invalid email').optional({checkFalsy:true}).isEmail(),
        // body('ui_mobile','Invalid mobile').optional({checkFalsy:true}).isInt().isLength({min:10}),
        // body('ui_user_name', 'Username must have at least 4 character').exists().isLength({min:4}),
        // body('ui_password', 'Password must have at least 4 character').exists().isLength({min:4})
        // .not().isIn(['1234', 'password', 'abcd']).withMessage('Do not use a common word as the password')
        // .matches(/\d/).withMessage('must contain a number')
       ]   
    }    

    // default:
    //             return [body('', '')]
                 // return res.status(500).json({"success":false,'msg':'i s e'});
                // return res.status(500).json({"success":false,'msg':'i s e'});


  }
}

exports.validationHandler = (req,res,next) => {
	  req.getValidationResult()
	  .then(result=>
	  {
	  	if(result.isEmpty())
	  		next();
	  	else
	  	{
	  		return res.status(400).json({"success":false,'msg':result.array()[0].msg,'field':result.array()[0].param});
	  	}
	  }) // to get the result of above validate fn
}

  // req.getValidationResult().then(result=>{console.log(result.isEmpty(),result.array().map(i => `'${i.param}' has ${i.msg}`).join(' '))}) // to get the result of above validate fn
