import GitHub from 'passport-github';
import passport from 'passport'
import User from '../schema/User'
import { encrypt } from '../utils/crypto'
import { config } from '../config';

passport.serializeUser(async (user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findOne({ id });
        return user ? done(null, user) : done(null, null)
    } catch (error) {
        console.log(error);
        done(error, null)
    }
})

passport.use(new GitHub.Strategy({
    clientID: config.githubClientID ,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallback,
},
    async function (accessToken, refreshToken, profile, done) {
        // refreshtoken is always undefined, no need interacting with it

        let enc = encrypt(accessToken);
        let { id, displayName, username } = profile
        let avatar = `https://avatars.githubusercontent.com/u/${id}?v=4`

        try {
            let findUser = await User.findOneAndUpdate({ id }, {
                displayName,
                username,
                avatar,
                accessToken: enc,
            }, { new: true })

            if(findUser) done(null, findUser)
            else {
                let newUser = await User.create({
                    _id: id,
                    id,
                    displayName,
                    username,
                    avatar,
                    accessToken: enc,
                })
                
                done(null, newUser)
            }


        } catch (error) {
            console.log(error)
            return done(error, undefined)
        }
    }
));