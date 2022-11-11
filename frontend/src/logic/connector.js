
import axios from 'axios';

export let token = null;
export let tokenRefresh = null;

async function execPost(url, body) {

    try {

        fromLocalStorage();
        const tokenParams = token === null ? {} : {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        };

        // console.log(tokenParams);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.post(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

async function execPatch(url, body) {

    try {

        fromLocalStorage();
        const tokenParams = token === null ? {} : {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        };

        // console.log(tokenParams);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.patch(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

async function execDelete(url, body) {
    try {

        fromLocalStorage();
        const tokenParams = token === null ? {} : {
            'Authorization' : `Bearer ${token}`
        };

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.delete(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

async function execGet(url, body) {
    try {

        fromLocalStorage();

        const tokenParams = token === null ? {} : {
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
        };

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.get(url, body, {...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}


export async function tryInitialize() {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", tokenRefresh);
}

export async function fromLocalStorage() {
    token = localStorage.getItem("token");
    tokenRefresh = localStorage.getItem("refreshToken");
}

export function isAuthorized() {
    return token !== null;
}

export async function registerNewUser({username, first_name, password, password2}) {
    return await execPost('/api/register/', {
        username,
        first_name,
        password,
        password2

    });
}

export async function login({ username, password }) {
    const res = await execPost('/api/token/', {
        username,
        password
    });

    if (!res) return res;
    const { access, refresh } = res;

    token = access;
    tokenRefresh = refresh;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    tryInitialize();

    return true;
}

export async function createNewGoal(title, description) {
    return await execPost('/api/goals/create_goal/', {
        title,
        description
    });
}


export async function deleteGoal(goal_id) {
    return await execPost('/api/goals/delete/' + goal_id + '/');
}

/*Хз, проверить, как передавать поля*/
export async function renameGoal(goal_id, new_name)
{
    return await execPost('/api/goals/', {
        goal_id, 
        new_name
    });
}

/*Хз, проверить, как передавать поля*/

export async function updateGoalDescription ( goal_id, new_description)
{
    return await execPost('/api/goals/', {
        goal_id, 
        new_description
    });
}


export async function getAllInboxes( )
{
    return await execGet('/api/inbox/list/');
}


export async function createInboxItem (  title, description)
{
    return await execPost('/api/inbox/create/', {
        title,
        description
    });
}


export async function deleteInboxItem (inbox_id)
{
    return await execPost('/api/inbox/delete/' + inbox_id + '/');
}

/*createTask*/


export async function renameInboxItem ( user_id, inbox_id, new_name)
{
    return await execPost('/api/inbox/', {
        user_id,
        inbox_id,
        new_name
    });
}

export async function updateInboxItemDescription ( user_id, inbox_item_id, new_description)
{
    return await execPost('/api/inbox/', {
        user_id,
        inbox_item_id,
        new_description
    });
}

export async function getAllTasks() {
    const response = await execGet('/api/task/list/');
    return mapTasks(response);
}


export async function createTask (title, description, importance, urgency, horizon, state, reference=null, goals=null) {
    return await execPost('/api/task/create/', {
        title,
        importance,
        urgency,
        horizon,
        state,
        reference,
        goals,
        description
    });
}


export async function patchTask (task_id, title, description, state, importance, urgency, goals, reference, horizon) {
    return await execPatch(`/api/task/patch/${task_id}/`, {
        state,
        importance,
        urgency,
        title,
        description,
        goals,
        reference,
        horizon
    });
}

export async function createGoal(title, description) {
    return await execPost('/api/goals/create_goal', {
        title,
        description
    });
}

export async function getAllGoals() {
    return await execGet('/api/goals/list', {});
}

const state = { 
    cards : [[], [], []],
    goals : [],
    inbox : []
};

function convertTask (task, _, tasksList) {
    return {
        id: task["id"],
        name: task["title"],
        desc: task["description"],
        parent: task["reference"],
        fullName: task.fullName,
        tags: task["goals"].map(e => {
            const r = state.goals.find(x => x.id === e);
            if (r) {
                return r.name;
            } else {
                return null;
            }
        }).filter(x => x !== null),
        hasChild: tasksList
            .map( cur => cur["reference"] === task["id"] )
            .reduce((x, y) => x || y, false),
        bucket: task["horizon"],
        state: task["state"],
        urgency : task['urgency'],
        importance: task['importance']

    }
}

function mapTasks(response) {
    for (const task of response) {
        let cur = task.reference;
        task.fullName = [];
        while(cur !== null) {
            const cur2 = response.find(x => x.id === cur);
            task.fullName.push(cur2.title);
            cur = cur2.reference;
        }
    }
   
    return [
        response.filter( task => task["state"] === "done" ).map( convertTask ),
        response.filter( task => task["state"] === "progress" ).map( convertTask ),
        response.filter( task => task["state"] === "todo" ).map( convertTask )
    ];
}

function mapGoals(response) {
    return response.map(e => { return { id: e.id, name : e.title, desc : e.description }});
}

export function getCards() {
    return state.cards;
}

export function getGoals() {
    return state.goals;
}

export function getInbox() {
    return state.inbox;
}

const onmsg = [];
export function onMsg(f) {
    onmsg.push(f);
}

let initilized = false;
export function initilize() {

    if (initilized) return;
    initilized = true;
    const ws = new WebSocket(
        `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:${window.location.port}/listen`
    );

    ws.onopen = () => {
        console.log('OPENED!');
    }

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.goal) {
            state.goals = mapGoals(data.goal);
        }
        if (data.task) {
            state.cards = mapTasks(data.task);
            state.inbox = data.task.filter(x => x.state === 'inbox').map(convertTask);
        }

        console.log(state);
        for (const f of onmsg) {
            f(state);
        }
    }

    ws.onerror = console.error;

    ws.onclose = () => {
        console.log('CLOSED!');
    }
}
