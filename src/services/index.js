import axios from "axios";

export const baseURL = 'https://fakestoreapi.com/'
// متدهایی که برای فراخوانی سرویس در قسمت های مختلف نیاز داریم
export function getUser(id) {
    return axios.get(`${baseURL}users?limit=${id}`)
}

export function deleteUser(id) {
    return axios(`${baseURL}users/${id}`, { method: 'DELETE' })
}

export function createUser(user) {
    return fetch(`${baseURL}users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export function updateUser(user, id) {
    return fetch(`${baseURL}users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}
