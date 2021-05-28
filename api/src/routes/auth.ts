import { Router } from 'express';
import passport from 'passport';

let router = Router();


router.get('/github', passport.authenticate('github', { session: true }))

router.get('/github/callback', passport.authenticate('github', { session: true }), (req, res) => {
    res.redirect('http://localhost:3000/channels/me')
})

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(401).send({ msg: 'Unauthorized' })
    }
})

export default router;