const Todo = require('../models/todo');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const db = require('../db');
const userService = require('../service/userService');

class TodoController{
    todo_helloPage(req,res){
        res.render('hello');
    }
    async todo_mainPage(req,res){
        const todos = await db.query('select * from todo');
        res.render('todos',{todos: todos.rows});
    };
    
    async todo_createTodo(req,res){
        const {name,aim,daysToDo} = req.body;
        await db.query('INSERT INTO todo (name, aim, daysToDo) VALUES ($1,$2,$3)',[name,aim,daysToDo]);
        res.redirect('/todos');
    }
    
    async todo_deleteTodo(req,res){
        await db.query('delete from todo where id = $1',[req.params.id]);
        res.json({redirect:'/todos'});
    }
}


module.exports = new TodoController();









/*module.exports.todo_helloPage = (req,res)=>{
    res.render('hello');
}
module.exports.todo_mainPage = (req,res)=>{
    Todo.find()
    .then(result=>res.render('todos',{todos: result}))
    .catch(err=>console.log(err));
};

module.exports.todo_createTodo = (req,res)=>{
    req.body.daysToDo = Number(req.body.daysToDo);
    const todo = new Todo(req.body);

    todo.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err));
}

module.exports.todo_deleteTodo = (req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
        .then(result=>
            res.json({redirect:'/'}))
        .catch(err=>
            console.log(err));
}

const maxAge = 5*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'secret',{
        expiresIn: maxAge
    })
}
const handleErrors= (err)=>{
    console.log(err.message,err.code);
    return {email:'',password:''};
}
module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}
module.exports.signup_post = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000})
        res.status(201).json({user: user._id});
    }
    catch(e){
        const errors = handleErrors(e);
        res.status(400).json({errors});
    }

}

module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000})
        res.status(200).json({user: user._id});
    }
    catch(e){
        const errors = handleErrors(e);
        res.status(400).json({errors});
    }

}
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }
*/