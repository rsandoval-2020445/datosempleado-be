const pool = require('../config/db')

const getColaboradores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM COLABORADOR')

        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const createColaborador = async (req, res) => {
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body

    if (!nombre || !apellido || !edad) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    try {
        const [existe] = await pool.query(
            'SELECT * FROM COLABORADOR WHERE NOMBRE = ? AND APELLIDO = ?',
            [nombre, apellido]
        )

        if (existe.length > 0) {
            return res.status(409).json({ message: 'El colaborador ya está registrado' })
        }

        const [result] = await pool.query(
            'INSERT INTO COLABORADOR (NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, direccion, edad, profesion, estadocivil]
        )
        res.status(201).json({ id: result.insertId, message: 'Colaborador creado' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateColaborador = async (req, res) => {
    const { id } = req.params 
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE COLABORADOR SET NOMBRE=?, APELLIDO=?, DIRECCION=?, EDAD=?, PROFESION=?, ESTADOCIVIL=? WHERE IDCOLABORADOR=?',
            [nombre, apellido, direccion, edad, profesion, estadocivil, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Colaborador no encontrado'})
        }

        res.json({ message: 'Colaborador actualizado correctamente'})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteColaborador = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('DELETE FROM COLABORADOR WHERE IDCOLABORADOR = ?', [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Colaborador no encontrado'})
        }
        res.json({ message: 'Colaborador eliminado correctamente'})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getColaboradores,
    createColaborador,
    updateColaborador,
    deleteColaborador
}