// src/Helpers/dbQueries.js
import connection from './index.js';

export const insertUser = (email, password, user, callback) => {
    const query = 'INSERT INTO users (email, password, user) VALUES (?, ?, ?)';
    connection.query(query, [email, password, user], callback);
};

export const selectUserByEmailAndPassword = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], callback);
};

export const loginUser = (email, password)=>{
    const querry = 'SELECT email from users where email = ? AND password =?';
    connection.query(querry, [email, password], callback);
}

