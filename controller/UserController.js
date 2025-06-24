import { UserModel } from '../models/UserModel.js'

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: ['id', 'nombre', 'correo', 'createdAt']
    })

    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' })

    res.json(user)
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    res.status(500).json({ mensaje: 'Error del servidor' })
  }
}


