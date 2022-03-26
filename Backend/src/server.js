import express from 'express';
import config from './config/config.js';
import morgan from 'morgan';
import { connect, Devices } from './database/database.js';
import { validate } from 'jsonschema';
import { DeviceSchema } from './api/validation/devices.js';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcrypt'
import passport from 'passport'
import initializePassport from './middleware/passport.js'
import session from 'express-session';
import is_authenticated from './middleware/authenticated.js';
import { Users } from './database/database.js';
import { AuthenticationSchema } from './validation/authentication.js';



const app = express();
const PORT = config.server.port;

app.use(cors({credentials:true, origin: [/localhost/]}))

//use nice middleware logging from request
app.use(morgan('combined'));

//enable application/json parsing
app.use(express.json());

app.use(express.static('data/uploads'))

// Authentication:
initializePassport(passport, Users.find_by_email, Users.find_by_id);
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send({
        message: 'Welcome to Cevice Creator API',
        version: `${process.env.npm_package_version}`
    })
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + ".png")
    }
})

const upload = multer({storage: storage})

app.post('/register', upload.single('image'), (req, res) => {
    // Never, ever thrust client side data !
    const validation = validate(req.body, AuthenticationSchema.register.body);
    if (!validation.valid) {
        return res.status(400).send({
            message: 'Invalid user information',
            errors: validation.errors.map(e => e.stack)
        });
    }

    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            return Users.create(req.body.email, req.body.username, hashedPassword, req.file.filename)
        })
        .then((user) => {
            //delete user.password // Don't send back the password
            res.send("registered")
        })
        .catch(() => {
            res.status(500).send({
                message: "Failed to create user object"
            })
        })
});

app.post('/login', (req, res, next) => {
    
    const validation = validate(req.body, AuthenticationSchema.login.body)
    if (!validation.valid) {
        return res.status(400).send({
            message: 'Invalid user information',
            errors: validation.errors.map(e => e.stack)
        });
    }
    console.log("Trying to autenticate the user")
    passport.authenticate('local', function (err, user, info) {
        if (err) return res.status(500).send({ message: 'Authentication failed' })
        if (!user) return res.status(400).send({ message: 'Failed to login. Are credentials ok?' })

        console.log("User found and logged in")
        req.login(user, (err) => {
            if (err) return res.status(500).send({ message: 'Login failed' });
            // delete user.password
            return res.send(user)
        })
    })(req, res, next);
})

app.get('/logout', (req, res, next) => {
    res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.');
})

app.get('/secure', is_authenticated, (req, res) => {
    res.send({
      message: 'Welcome to this secure route',
      secure: true,
      user: req.user
    })
  })


app.get('/devices', is_authenticated, (req, res) => {
    res.send(Devices.all());
});

app.get('/devices/:id', is_authenticated ,(req, res) => {
    res.send(Devices.onedevice(req.params.id))
});



app.post('/devices', upload.single('image'), is_authenticated, (req, res) => {

    const validation = validate(req.body, DeviceSchema.create);
    if(!validation.valid){
        console.log(validation)
        res.status(400).send({
            message: 'JSON validation failed',
            details: validation.errors.map( e => e.stack)
        })
        return;
    }
    console.log(req.body)
    Devices.create(req.body, req.file.filename)
    .then((device) => {
        res.status(201).send(device);
    })
    .catch(() => {
        res.status(500).send({
            message: "Failed to write to JSON db",
            code: 105
        })
    })    
})

await connect();

app.listen(PORT, () =>{
    console.log(`Express api running at port ${PORT}`)
});

