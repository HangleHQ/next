import { Router } from 'express';
import passport from 'passport';

let router = Router();


router.get('/github', passport.authenticate('github', { session: true }))

router.get('/github/callback', function (req, res, next) {
    passport.authenticate('github', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/github'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('http://localhost:3000');
        });
    })(req, res, next);
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(401).send({ msg: 'Unauthorized' })
    }
})

export default router;