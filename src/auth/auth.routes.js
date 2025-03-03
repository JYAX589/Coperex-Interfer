import { Router } from 'express';
import { login, register } from './auth.controller.js'; // Importa login y register

const router = Router();

router.post('/login', login); // Usa la función login importada
router.post('/register', register);

export default router;