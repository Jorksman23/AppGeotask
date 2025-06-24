import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config/config.js';

/**
 * Verifica el token JWT y agrega el usuario a req.usuario
 */
// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   // Verifica que venga el header con formato: Bearer token
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ mensaje: 'Token no proporcionado' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, TOKEN_KEY);
//     req.usuario = decoded; // Ahora tienes acceso a req.usuario.id, etc.
//     next();
//   } catch (error) {
//     return res.status(401).json({ mensaje: 'Token inválido o expirado' });
//   }
// };

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' })

  try {
    const decoded = jwt.verify(token, TOKEN_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' })
  }
}
