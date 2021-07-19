import { Router } from 'express';
import auth from './auth'
import communities from './communities'
import users from './users'

let router = Router();

router.use('/auth', auth)
router.use('/communities', communities)
router.use('/users', users)

export default router;