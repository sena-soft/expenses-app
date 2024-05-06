import axios from "axios";

const BACKEND_URL = 'https://expenses-app-13af5-default-rtdb.firebaseio.com';


export async function storeExpense(expenseData, token, user) {
    const response = await axios.post(`${BACKEND_URL}/${user}.json?auth=${token}`, expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses(token, user) {
    console.log(user);
    const response = await axios.get(`${BACKEND_URL}/${user}.json?auth=${token}`);
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export function deleteExpense(id, token, user) {
    return axios.delete(`${BACKEND_URL}/${user}/${id}.json?auth=${token}`);
}

export function updateExpense(id, expenseData, token, user) {
    console.log(`${BACKEND_URL}/${user}/${id}.json?auth=${token}`);
    return axios.put(`${BACKEND_URL}/${user}/${id}.json?auth=${token}`, expenseData);

}