
import axios from 'axios';

async function execPost(url, body) {
    try {
        const res = await axios.post(url, JSON.stringify(body), { 'Content-Type' : 'application/json' });
        return res.data;
    } catch (ex) {
        console.error(ex.response ? ex.response.data : ex);
        return null;
    }
}

export async function registerNewUser({ name, username, password, password2 }) {
    return await execPost('/api/register/', {
        username,
        password,
        password2
    });
}
