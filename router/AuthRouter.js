import { Router } from 'express';
import { registerUser } from '../controller/AuthController.js';
import { validateRegister } from '../middleware/validatorMiddleware.js';
import rateLimit from '../middleware/rateLimiter.js';

import { loginUser} from '../controller/AuthController.js';
const router = Router();

router.post('/register', rateLimit, validateRegister, registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
  return res.status(200).json({
    mensaje: 'Sesión cerrada correctamente.'
  });
});
// Agregaremos más rutas luego

export default router;
