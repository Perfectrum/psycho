
import axios from 'axios';

let token = null;
let tokenRefresh = null;

async function execPost(url, body) {
    try {
        const tokenParams = token === null ? {} : {
            'Authorization' : `Bearer ${token}`
        };

        const res = await axios.post(url, body, { 'Content-Type' : 'application/json', ...tokenParams });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

export function isAuthorized() {
    return token !== null;
}

export async function registerNewUser({ name, username, password, password2 }) {
    return await execPost('/api/register/', {
        username,
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

    return true;
}

export async function createNewGoal({user_id, name, description }) {
    return await execPost('/api/goals/', {
        user_id,
        name,
        description
    });
}


export async function deleteGoal({user_id, goal_id }) {
    return await execPost('/api/goals/', {
        user_id,
        goal_id
    });
}


export async function renameGoal({user_id, goal_id, new_name })
{
    return await execPost('/api/goals/', {
        user_id,
        goal_id, 
        new_name
    });
}

export async function updateGoalDescription ( user_id, goal_id, new_description)
{
    return await execPost('/api/goals/', {
        user_id,
        goal_id, 
        new_description
    });
}

export async function createInboxItem ( user_id, name, description)
{
    return await execPost('/api/goals/', {
        user_id,
        name, 
        description
    });
}

export async function renameInboxItem ( user_id, inbox_id, new_name)
{
    return await execPost('/api/goals/', {
        user_id,
        inbox_id,
        new_name
    });
}

export async function update_inbox_item_description ( user_id, inbox_item_id, new_description)
{
    return await execPost('/api/goals/', {
        user_id,
        inbox_item_id,
        new_description
    });
}