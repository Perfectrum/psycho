
const path = require('path');

const { json : bp } = require('body-parser');
const express = require('express');
const { Schema, default: mongoose, Types } = require('mongoose');
const app = express();

const http = require('http');

const { WebSocketServer } = require('ws');

const BUILD_DIR = path.resolve(__dirname, '..', 'frontend', 'build');

const sockets = [];

function notificate(data) {
    for (const s of sockets) {
        s.send(JSON.stringify(data));
    }
}

app.use(bp());
app.use(express.static(BUILD_DIR));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
});

const userModel = new Schema({
    username : String,
    first_name : String,
    password : String,
    password2 : String
});
userModel.set('toJSON', {
    virtuals: true
});
const UserDao = mongoose.model('user', userModel);

const cardModel = new Schema({
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
    title : String,
    description : String
});
goalModel.set('toJSON', {
    virtuals: true
});
const GoalDao = mongoose.model('goal', goalModel);

const dbModels = [UserDao, CardDao, GoalDao];

for (const model of dbModels) {
    app.get(`/api/${model.modelName}/list`, (req, res) => {
        model.find({})
            .then(e => res.json(e))
            .catch(e => res.sendStatus(500));
    });
}

app.post('/api/goals/create_goal', (req, res) => {
    const a = new GoalDao(req.body);
    a.save()
        .then(() => GoalDao.find({}))
        .then((data) => {
            notificate({ goal : data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

app.post('/api/task/create/', (req, res) => {
    const a = new CardDao(req.body);
    a.save()
        .then(() => CardDao.find({}))
        .then((data) => {
            notificate({ task :data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

app.patch('/api/task/patch/:id', (req, res) => {
    CardDao.findByIdAndUpdate(req.params.id, req.body)
        .then(() => CardDao.find({}))
        .then((data) => {
            notificate({ task : data });
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
});

const server = http.createServer(app);
const ws = new WebSocketServer({ server, path: '/listen' });

ws.on('connection', (socket) => {
    socket.on('error', console.error);
    sockets.push(socket);
    socket.on('close', () => {
        const idx = sockets.indexOf(socket);
        sockets.splice(idx, 1);
    });

    GoalDao.find({})
        .then(goal => {
            CardDao.find({})
                .then(task => {
                    notificate({ goal, task });
                })
                .catch(console.error);
        })
        .catch(console.error);
});

ws.on('error', console.error);

mongoose.connect('mongodb://localhost:27017/psycho-db')
    .then(() => {
        server.listen(process.env.PORT || 6969, () => {
            console.log('Online!');
        });
    })
    .catch(console.error);


