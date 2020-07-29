const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'APIVortex',
    port: '5432'
})

//Listar usuario

const getUsers = async (req, res) => {
    const resp = await pool.query("SELECT * FROM users");
    res.json(resp.rows);
}

//Crear usuario
const createUser= async (req,res) => {

    const { first_name, last_name, type_document, document, phone, email, admission_date, salary } = req.body;
    const respu = await pool.query("INSERT INTO users (first_name,last_name,type_document,document,phone,email,admission_date,salary,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'passwordDefault')", [first_name, last_name, type_document, document, phone, email, admission_date, salary])
    console.log(respu);
    res.json({
        message: 'Usuario creado',
        body: {
            user: { first_name, last_name, type_document, document, phone, email, admission_date, salary }
        }
    })

}
//Ver un usuario
const showUser = async (req,res) => {
    // const hi = [req.params.id];

    // console.log(hi);
    //     if (err) throw err;
    //     console.log(result);
    // }); 
    // res.json(resp.rows);
    
    const id = req.params.id;
    
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    // const resp = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    
    
    // console.log(dato);
    res.json(response.rows[0]);

}

//Actualizar usuario

const updateUser = async (req, res) => {

    const id = req.params.id;
    const { first_name, last_name, type_document, document, phone, email, admission_date, salary } = req.body;
    const resp = await pool.query("UPDATE users SET first_name = $1, last_name = $2, type_document = $3, document = $4, phone = $5, email = $6, admission_date = $7, salary = $8 WHERE id = $9",[
        first_name, 
        last_name, 
        type_document, 
        document, phone, 
        email, 
        admission_date, 
        salary,
        id
    ])
    res.json(resp.rows);

}

//Borrar usuario
const deleteUser = async (req,res) => {

    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json(response.rows)
}

module.exports = {
    getUsers,
    createUser,
    showUser,
    deleteUser,
    updateUser
}