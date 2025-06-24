import { Router } from 'express';
import { registerUser } from '../controller/AuthController.js';
import { validateRegister } from '../middleware/validatorMiddleware.js';
import rateLimit from '../middleware/rateLimiter.js';
import { loginUser, registerUser } from '../controllers/AuthController.js';
const router = Router();

router.post('/register', rateLimit, validateRegister, registerUser);
router.post('/login', loginUser);

// Agregaremos más rutas luego

export default router;
