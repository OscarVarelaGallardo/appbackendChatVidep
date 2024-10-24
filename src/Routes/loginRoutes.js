import {Router} from 'express'
import {login, register } from '../Controllers/loginControllers.js'

const loginRoutes  = Router()



loginRoutes.post('/login', login)
loginRoutes.post('/register', register)



export default loginRoutes;