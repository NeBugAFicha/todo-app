const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../db');
const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'secret',async(err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next()
            }else{
                 let user = await db.query('Select * from users where id = $1',[decodedToken.id]);
                 res.locals.user = user.rows[0];
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,checkUser
}