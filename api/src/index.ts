import './strategies/github'
import express, { Application } from 'express'
import passport from 'passport'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose';
import cm from 'connect-mongo'
import routes from './routes';
import { config } from './config'

mongoose.connect(config.mongodburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const app: Application = express();
const Store = cm(session)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())

app.use(cors({
    origin: 'localhost:3000'
}))

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

app.listen(80)