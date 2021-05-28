import { Router } from 'express';
import auth from './auth'

let router = Router();

router.use('/auth', auth)

export default router;