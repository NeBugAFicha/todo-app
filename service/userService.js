const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserService{
    maxAge = 5*24*60*60;
    handleErrors(err){
        console.log(err.message,err.code);
        return {email:'',password:''};
    }
    createToken(id){
        return jwt.sign({id},'secret',{
            expiresIn: this.maxAge
        })
    }
    async encryptPassword(password){
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password,salt);
        return password;
    }
    async login(email,password){
        const user = await db.query('select * from users where email = $1',[email]);
        if(user){
            console.log(user.rows[0]);
            const auth = await bcrypt.compare(password, user.rows[0].password);
            if(auth){
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
}

module.exports = new UserService();