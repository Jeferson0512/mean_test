var express = require('express'),
    router = express.Router()
    mongojs = require('mongojs'),
    db = mongojs('bd_test', ['users']);

/* GET home page. */
router.get('/user', (req, res, next) => {
    db.users.find((err, users) =>{
        if(err) return next(err);
        res.json(users);
    });
});

router.get('/user/:id', (req, res, next) => {
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, user) =>{
        if(err) return next(err);
        res.json(user); 
    });
});

router.post('/user', (req, res, next) => {
    let user = req.body;
    if(!user.title || !(user.isDone+'')){
        res.status(400).json({
            error : 'Bad data'
        });
    }else{
        db.users.save(user, (err, user) =>{
            if(err) return next(err);
            res.json(user);     
        });
    }
});

router.delete('/user/:id', (req, res, next) =>{
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if(err) return next(err);
        res.json(result);
    });
});

router.put('/user/:id', (req, res, next) => {
    let res_task = req.body;
    let updateTask = {};
    if(res_task.isDone){
        updateTask.isDone = res_task.isDone;
    }
    if(res_task.title){
        updateTask.title = res_task.title;
    }
    if(!updateTask){
        res.status(400).json({
            error: 'Bad Request'
        });
    }else{
        db.users.update({_id: mongojs.ObjectId(req.params.id)}, updateTask , (err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    }
});

module.exports = router;