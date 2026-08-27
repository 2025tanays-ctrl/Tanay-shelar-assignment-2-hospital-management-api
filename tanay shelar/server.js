const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(express.json());

const requestlogger = (request, response, next)=>{
    console.log("request URL :-",request.url,"request method :-",request.method," Date :-",new Date());
next();
}

app.use(requestlogger);

passport.use(new LocalStrategy((username,password,done)=>{
    const user=users.find((u)=>u.username===username);
    if(!user){
        return done(null,false);
    }
    if(user.password!==password){
        return done(null,false);
    }
    return done(null,user);
}));

app.use(passport.initialize());

const isAuthenticated=passport.authenticate('local',{session:false});


let hospitals=[];
let users=[];

app.post("/register",(request,response)=>{
    try{
        const newuser={
            id:users.length+1,
            name:request.body.name,
            username:request.body.username,
            email:request.body.email,
            password:request.body.password,
        }
        users.push(newuser);
        response.status(200).json({message:"user registered successfully!!"});
    } catch(error){
        response.status(500).json(error);
    }
})

app.get('/hospitals',(request,response)=>{
    try{
        response.status(200).json(hospitals);
    } catch(error){
        response.status(500).json(error);
    }
});

app.get("/hospitals/:id",(request,response)=>{
    try{
        const hospital=hospitals.find((c)=>c.id==request.params.id);
        if(!hospital){
            return response.status(404).json({message:"hospital not found"});
        }
        else{
            response.status(200).json(hospital);
        }
    } catch(error){
        response.status(500).json(error);
    }
});

app.post("/hospitals",isAuthenticated,(request,response)=>{
    try{
        const newhospital={
            id:hospitals.length+1,
            name:request.body.name,
            location:request.body.location,
        }
        hospitals.push(newhospital);
        response.status(200).json(newhospital);
    } catch(error){
        response.status(500).json(error);
    }
});

app.put("/hospitals/:id",isAuthenticated,(request,response)=>{
    try{
        let hospital=hospitals.find((c)=>c.id==request.params.id);
        if(!hospital){
            return response.status(404).json({message:"hospital not found"});
        }
        else{
            hospital.name=request.body.name;
            hospital.location=request.body.location;
            response.status(200).json(college);
        }
    } catch(error){
        response.status(500).json(error);
    }
});

app.delete("/hospitals/:id",isAuthenticated,(request,response)=>{
    try{
        const hospitalIndex=hospitals.findIndex((c)=>c.id==request.params.id);
        if(hospitalIndex===-1){
            return response.status(404).json({message:"hospital not found"});
        }
        else{
            hospitals.splice(hospitalIndex,1);
            response.status(200).json({message:"hospital deleted"});
        }
    }catch(error){
        response.status(500).json(error);
    }
});

app.listen(4000,()=>{
    console.log("server is running on port 4000");
})