
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

export async function renameGoal({uuser_id, goal_id, new_name })
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