const express = require("express")
const cors = require("cors")
const pool = require('./config/db')

const colaboradorRoutes = require('./routes/colaboradorRoutes.js')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/colaborador', colaboradorRoutes)

app.get('/', (req, res) => {
    res.send('API de Sistema funcionando')
})

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)

    try {
        const [rows] = await pool.query('SELECT 1')
        console.log('Conexion a la db exitosa')
    } catch (error) {
        console.error('Error al conectar a la base de datos', error.message)
    }
})