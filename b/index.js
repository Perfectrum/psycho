
const path = require('path');

const { json : bp } = require('body-parser');
const cp = require('cookie-parser');
const express = require('express');
const { Schema, default: mongoose, Types } = require('mongoose');
const app = express();

const http = require('http');

const { WebSocketServer } = require('ws');

const BUILD_DIR = path.resolve(__dirname, '..', 'frontend', 'build');

const sockets = [];

function notificate(uid, data) {
    for (const s of sockets) {
        if (s.uid === uid) {
            s.send(JSON.stringify(data));
        }
    }
}

app.use(bp());
app.use(cp());

app.use(express.static(BUILD_DIR));

app.use((req, res, next) => {
    if(req.url.includes('api') || req.url.includes('listen')) {
        return next();
    }

    res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
});

const userModel = new Schema({
    username : String,
    first_name : String,
    password : String
});
userModel.set('toJSON', {
    virtuals: true
});
const UserDao = mongoose.model('user', userModel);

const cardModel = new Schema({
    user : Types.ObjectId,
    title : String,
    importance : Number,
    urgency : Number,
    horizon : Number,
    state : String,
    reference : Types.ObjectId,
    goals : { type : [Types.ObjectId], default : []},
    description : String
});
cardModel.set('toJSON', {
    virtuals: true
});
const CardDao = mongoose.model('task', cardModel);

const goalModel = new Schema({
    user : Types.ObjectId,
    title : String,
    description : String
});
goalModel.set('toJSON', {
    virtuals: true
});
const GoalDao = mongoose.model('goal', goalModel);

app.post('/api/register', (req, res) => {
    const a = new UserDao(req.body);
    a.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

app.post('/api/token', (req, res) => {
    UserDao.findOne({
        username : req.body.username,
        password : req.body.password
    }).then(x => res.json({ access : x.id, refresh : null }))
    .catch(() => res.sendStatus(400));
});

app.use((req, res, next) => {
    if (req.cookies.token) {
        req.uid = req.cookies.token;
        return next();
    } else {
        res.sendStatus(401);
    }
});

const dbModels = [UserDao, CardDao, GoalDao];

for (const model of dbModels) {
    app.get(`/api/${model.modelName}/list`, (req, res) => {
        model.find({ user : req.uid })
            .then(e => res.json(e))
            .catch(e => res.sendStatus(500));
    });
}

app.post('/api/goals/create_goal', (req, res) => {
    const a = new GoalDao({ user : req.uid, ...req.body });
    a.save()
        .then(() => GoalDao.find({ user : req.uid }))
        .then((data) => {
            notificate(req.uid, { goal : data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

app.post('/api/task/create/', (req, res) => {
    const a = new CardDao({ user : req.uid, ...req.body });
    a.save()
        .then(() => CardDao.find({ user : req.uid }))
        .then((data) => {
            notificate(req.uid, { task :data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

app.patch('/api/task/patch/:id', (req, res) => {
    CardDao.findOneAndUpdate({ _id : req.params.id, user : req.uid }, req.body)
        .then(() => CardDao.find({ user : req.uid }))
        .then((data) => {
            notificate(req.uid, { task : data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

const server = http.createServer(app);
const ws = new WebSocketServer({ server, path: '/listen' });

ws.on('connection', (socket) => {

    let authroized = false;

    socket.on('error', console.error);

    socket.on('message', (msg) => {
        socket.uid = msg.toString(); 
        sockets.push(socket);
        authroized = true;

        GoalDao.find({ user : socket.uid })
        .then(goal => {
            CardDao.find({ user : socket.uid })
                .then(task => {
                    notificate(socket.uid, { goal, task });
                })
                .catch(console.error);
        })
        .catch(console.error);
    });

    socket.on('close', () => {
        if (!authroized) return;
        const idx = sockets.indexOf(socket);
        sockets.splice(idx, 1);
    });
});

ws.on('error', console.error);

mongoose.connect('mongodb://localhost:27017/psycho-db')
    .then(() => {
        server.listen(process.env.PORT || 6969, () => {
            console.log('Online!');
        });
    })
    .catch(console.error);


