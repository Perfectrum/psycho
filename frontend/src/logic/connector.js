
import axios from 'axios';

let token = null;
let tokenRefresh = null;

async function execPost(url, body) {

    try {
        const tokenParams = token === null ? {} : {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        };

        // console.log(tokenParams);

        const res = await axios.post(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

async function execDelete(url, body) {
    try {
        const tokenParams = token === null ? {} : {
            'Authorization' : `Bearer ${token}`
        };

        const res = await axios.delete(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

async function execGet(url, body) {
    try {
        const tokenParams = token === null ? {} : {
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
        };

        // console.log(tokenParams);

        const res = await axios.get(url, body, {...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
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

    for (const task of response) {
        let cur = task.reference;
        task.fullName = [];
        while(cur !== null) {
            const cur2 = response.find(x => x.id === cur);
            task.fullName.push(cur2.title);
            cur = cur2.reference;
        }
    }

    function convertTask (task, _, tasksList) {
        return {
            "id": task["id"],
            "name": task["title"],
            "desc": task["description"],
            "parent": task["reference"],
            "fullName": task.fullName,
            "tags": task["goals"],
            "hasChild": tasksList
                .map( cur => cur["reference"] === task["id"] )
                .reduce((x, y) => x || y, false),
            "bucket": task["horizon"]
        }
    }
   
    return [
        response.filter( task => task["state"] === "todo" ).map( convertTask ),
        response.filter( task => task["state"] === "progress" ).map( convertTask ),
        response.filter( task => task["state"] === "done" ).map( convertTask )
    ];
}


export async function createTask (title, importance, urgency, horizon, state, reference=null, goals=null) {
    const response = execPost('/api/task/create/', {
        title,
        importance,
        urgency,
        horizon,
        state,
        reference,
        goals
    });

    return getAllTasks();
}


export async function patchTask (task_id, title, description, state, importance, urgency) {
    const response = execPost('/api/task/patch/' + task_id + '/', {
        state,
        importance,
        urgency,
        title,
        description
    });
    
    return getAllTasks();
}