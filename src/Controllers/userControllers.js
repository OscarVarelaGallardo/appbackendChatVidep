import connection from '../Helpers/index.js';

const getUsers = (req, res) => {
    try {
        const querry = connection.query('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error('Error al realizar la consulta: ', err);
                res.status(500).send('Error al realizar la consulta'+ err.sqlMessage);
                return;
            }
            if (querry.length === 0) {
                res.status(404).send('No hay usuarios en la base de datos');
                return;
            }
            else{
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.error('Error al realizar la consulta: ', error);
        res.status(500).send('Error al realizar la consulta'+ error.sqlMessage);
        return;
    }
    const querry = connection.query('SELECT * FROM users', (err, rows) => {
        
        if (err) {
            console.error('Error al realizar la consulta: ', );
            res.status(500).send('Error al realizar la consulta'+ err.sqlMessage);
            return;
        }
        if (querry.length === 0) {
            res.status(404).send('No hay usuarios en la base de datos');
            return;
        }
        else{
            res.status(200).json(rows);
        }
    });
}

const getUserById = (req, res) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM users WHERE id = ${id}`,
        (err, rows) => {
        if (err) {
            console.error('Error al realizar la consulta: ', err);
            res.status(500).send('Error al realizar la consulta');
            return;
        }
        res.json(rows);
    });
}
const createUser = (req, res) => {
    const { name, email } = req.body;
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, rows) => {
        if (err) {
            console.error('Error al realizar la consulta: ', err);
            res.status(500).send('Error al realizar la consulta');
            return;
        }
        res.json(rows);
    });
}

const login =(req, res)=>{
    
}



export { getUsers , getUserById, createUser };