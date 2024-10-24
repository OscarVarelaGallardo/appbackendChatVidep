import connection from "../Helpers/index.js";
import { selectUserByEmailAndPassword } from "../Helpers/dbQuerries.js";

const register = (req, res) => {
    const { email, password, nombre } = req.body;
    if (!email || !password || !nombre) {
        res.status(400).send({ status: 400, msg: "Todos los valores son necesarios para realizar el registro" });
        return;
    }
    try {
        selectUserByEmailAndPassword(email, password, (error, rows) => {
            if (err) {
                console.error('Error al realizar la consulta', error);
                res.status(500).send({ status: 500, message: 'Error al realizar la consulta' });
                return;
            }
            if (res.status = 401) {
                res.status(401).send({ status: 401, message: 'Credenciales incorrectas', error });
            }
            res.status(200).send({ status: 200, message: 'Login exitoso', data: rows });
        })

    }
    catch (error) {
        console.error('Error al realizar la consulta', err);
        res.status(500).send({ status: 500, message: 'Error al realizar la consulta' });
        return;
    }
    try {
        connection.query('INSERT INTO users (email, password, nombre) VALUES (?, ?, ?)', [email, password, nombre], (err, result) => {
            if (err) {
                console.error('Error al realizar la consulta', err);
                res.status(500).send({ status: 500, message: 'Error al realizar la insercion del usuario' });
                return;
            }
            res.status(200).send({ status: 200, message: 'Usuario registrado exitosamente', data: result });
        });
    } catch (error) {
        console.error('Error al realizar la consulta', err);
        res.status(500).send({ status: 500, message: 'Error al realizar la consulta' });
        return;

    }
}

const login = (req, res) => {
    console.log(req.body)
    const { password, email } = req.body;
    if (!email || !password) {
        res.status(400).send({ status: 400, message: 'Todos los valores son necesarios para realizar el login' });
        return
    }
    try {
        const querry = connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows) => {
            if (err) {
                console.error('Error al realizar la consulta: ', err);
                res.status(500).send('Error al realizar la consulta' + err.sqlMessage);
                return;
            }
            if (querry.length === 0) {
                res.status(404).send({status:404, message:'Usuario no registado '})
              
                return;
            }
            if (rows.length > 0) {
                res.status(200).send({ status: 200, message: 'Usuario encontrado', data: rows });
                console.log('Usuario encontrado');
                return;
            }
            res.status(404).send({ status: 404, message: 'Usuario no encontrado' });
        }
        );
    } catch (error) {
        console.error('Error al realizar la consulta', err);
        res.status(500).send({ status: 500, message: 'Error al realizar la consulta' });
        return;
    }
}


export { login, register };