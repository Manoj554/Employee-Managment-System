const express=require('express');
const employeeModel = require('./employee');
const empModel=require('./employee');
const router=express.Router();
const employee=empModel.find({});


// GET HOME PAGE 
router.get('/',(req,res,next)=>{
    employee.exec(function(err,data){
        if(err) throw err;
        res.render('index',{title:'Employe Records',records:data,success:''});
    });
});
router.post('/',(req,res,next)=>{

    var empDetails=new empModel({
        name:req.body.uname,
        email:req.body.email,
        etype:req.body.emptype,
        hourlyrate:req.body.hrlyrate,
        totalhour:req.body.ttrh,
        total:parseInt(req.body.hrlyrate)*parseInt(req.body.ttrh),
    });

   empDetails.save((err,res1)=>{
        if(err) throw err;
        employee.exec((err,data)=>{
            if(err) throw err;
            res.render('index',{title:'Employee Deatails',records:data,success:'Record Inserted Successfully'})
    });
   });   
});


router.post('/search/',(req,res,next)=>{

    var fltrname=req.body.fltrname;
    var fltremail=req.body.fltremail;
    var fltretype=req.body.fltremptype;

    if(fltrname !='' && fltremail !='' && fltretype !=''){
        var flterpara={ $and:[{name:fltrname},
        {$and:[{email:fltremail},{etype:fltretype}]}
       ]
        }
    }
    
    else if(fltrname !='' && fltremail =='' && fltretype !=''){
        var flterpara={ $and:[{name:fltrname},{etype:fltretype}]}
    }
    
    else if(fltrname =='' && fltremail !='' && fltretype !=''){
        var flterpara={$and:[{email:fltremail},{etype:fltretype}]}
    }

    else if(fltrname =='' && fltremail =='' && fltretype !=''){
        var flterpara={etype:fltretype}
    }

    else{
        var flterpara={}
    }
    // console.log(fltrname);
    // console.log(fltretype);
    // var flterpara={name:fltrname,etype:fltretype}
    // var flterpara={ $and:[{name:fltrname},{etype:fltretype}]}
    // console.log(flterpara);

    var imp=empModel.find(flterpara);
    // console.log(imp);

    imp.exec((err,data)=>{
        if(err) throw err;
        res.render('index',{title:'Employee Deatails',records:data});
   
   });   
});

router.get('/delete/:id',(req,res,next)=>{
    
    var id=req.params.id;
    var del=empModel.findByIdAndDelete(id);

    del.exec(function(err,data){
        if(err) throw err;
        employee.exec((err,data)=>{
            if(err) throw err;
            res.render('index',{title:'Employee Deatails',records:data,success:'Record Deleted Successfully'})
        });
    });
});

router.get('/edit/:id',(req,res,next)=>{
    var id=req.params.id;
    var edit=empModel.findById(id);
    edit.exec(function(err,data){
        if(err) throw err;
    res.render('edit.pug',{title:'Edit Employe Records',records:data});
    });
});
router.post('/update',(req,res,next)=>{
    
    
    var update=empModel.findByIdAndUpdate(req.body.id,{
        name:req.body.uname,
        email:req.body.email,
        etype:req.body.emptype,
        hourlyrate:req.body.hrlyrate,
        totalhour:req.body.ttrh,
        total:parseInt(req.body.hrlyrate)*parseInt(req.body.ttrh),
    });
    update.exec(function(err,data){
        if(err) throw err;
        employee.exec((err,data)=>{
            if(err) throw err;
            res.render('index',{title:'Employee Deatails',records:data,success:'Record Updated Successfully'})
        });
    });
});
module.exports=router;