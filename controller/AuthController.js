import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';
import { TOKEN_KEY } from '../config/config.js';


    //AuthController: register, login, forgotPassword, resetPassword

export const registerUser = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Validación: correo ya registrado
    const usuarioExistente = await UserModel.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear nuevo usuario
    const nuevoUsuario = await UserModel.create({
      nombre,
      correo,
      contraseña: hash
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id, correo: nuevoUsuario.correo },
      TOKEN_KEY,
      { expiresIn: '2h' }
    );

    // Respuesta exitosa
    return res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo
      },
      token
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//Login
export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Buscar usuario por correo
    const usuario = await UserModel.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña inválidos' });
    }

    // Comparar contraseña
    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) {
      return res.status(400).json({ mensaje: 'Correo o contraseña inválidos' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      TOKEN_KEY,
      { expiresIn: '2h' }
    );

    // Respuesta exitosa
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      },
      token
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

