const db = require('../db');
const userService = require('../service/userService');
class UserController{
    
    
    signup_get(req,res){
        res.render('signup');
    }
    
    login_get(req,res){
        res.render('login');
    }
    async signup_post(req,res){
        let {email, password} = req.body;
        try{
            password = await userService.encryptPassword(password);
            const user = await db.query('INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *',[email,password]);
            const token = userService.createToken(user.rows[0].id);
            res.cookie('jwt',token,{httpOnly:true, maxAge:userService.maxAge*1000})
            res.status(201).json({user: user.rows[0].id});
        }
        catch(e){
            const errors = userService.handleErrors(e);
            res.status(400).json({errors});
        }
    
    }
    async login_post(req,res){
        const {email, password} = req.body;
        try{
            const user = await userService.login(email,password);
            const token = userService.createToken(user.id);
            res.cookie('jwt',token,{httpOnly:true, maxAge:userService.maxAge*1000})
            res.status(200).json({user: user.rows[0].id});
        }
        catch(e){
            const errors = userService.handleErrors(e);
            res.status(400).json({errors});
        }
    
    }
    logout_get(req, res){
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }
}

module.exports = new UserController();