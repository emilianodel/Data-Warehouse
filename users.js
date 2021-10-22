var express = require('express');
var server = express();
var cors = require('cors');
const parser = require('body-parser');
const Sequelize = require ('sequelize');
const path = `mysql://root@localhost:3306/data_warehouse`;
const myDataBase = new Sequelize(path);
server.use(parser.json());
server.use(express.json());
server.use(cors());

const jwt = require('jsonwebtoken');
const jwtPassword = "Ac4m1C4_D4t4_War3H0us3!"

/*server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});*/


myDataBase.authenticate().then(() =>{ 
    console.log('Conectado')

}).catch(err => {
    console.error('Error de conexion' , err)
})

module.exports = myDataBase;



server.listen(3000, function () {
    console.log('Sistema armado en el puerto 3000')
});

const verifyJWT = (req, res, next) => {

    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, jwtPassword);
        
        
        if(decodeToken) {
            req.token = decodeToken;
            return next();
        }

    }catch{
        res.status(401).send({error:"Usuario no autorizado"})
    }        
    
}

server.post('/users/login', async (req, res) => {
    const {email, pass} = req.body

    try {
        const loginUser = await myDataBase.query('SELECT * FROM users WHERE email =? && pass =?', {
            replacements: [email, pass],
            type: myDataBase.QueryTypes.SELECT,
        })

    if (loginUser.length == 0){
        res.status(401).json({message: "Usuario o contrasena incorrecta"})
    } else{
        const infoUser = {
            users_id: loginUser[0].users_id,
            email: loginUser[0].email,
            first_name: loginUser[0].first_name,
            last_name: loginUser[0].last_name,
            isAdmin: loginUser[0].isAdmin
        }
        token = jwt.sign(infoUser, jwtPassword)
        console.log(token)
        res.status(200).json({message: "Login exitoso", "token": token})
        }
    } catch (err) {
        console.log(err)
    }
})


function validateUser(req, res, next) {
    const {first_name, last_name, email, pass} = req.body;

    if (!first_name || !last_name|| !email || !pass){
        return res.status(400)
            .send({states: 'Error', message: 'Datos incompletos, es necesario completar todos los campos'})
    }

    return next();
}


const ifEmailExist = async (req, res, next) => {
    const {email} = req.body

    try {
        const ifUserExist = await myDataBase.query('SELECT * FROM users WHERE email =?', {
            replacements: [email],
            type: myDataBase.QueryTypes.SELECT
        })
        if(ifUserExist.length >= '1') {
            res.status(406).json({
                message: 'Usuario registrado'
            })

        } else {
            next();
        }
    }catch (err) {
        res.status(400).json ({
            message: 'Error'
        })
    }
}



server.post('/users', ifEmailExist, validateUser, async (req, res) => {

    const {first_name, last_name, email, pass} = req.body;

    const users =  await myDataBase.query('INSERT INTO users (first_name, last_name, email, pass) VALUES (?, ?, ?, ?)',
        {
        replacements: [first_name, last_name, email, pass],
        type: myDataBase.QueryTypes.INSERT,
        }
    )
    
    users.push(req.body);
    res.status(201).json({status: "Usuario creado exitosamente"});
    console.log(users);
})
