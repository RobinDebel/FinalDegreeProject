import express from 'express';
import config from './config/config.js';
import morgan from 'morgan';
import { connect} from './database/database.js';
import { validate } from 'jsonschema';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcrypt'
import passport from 'passport'
import initializePassport from './middleware/passport.js'
import session from 'express-session';
import is_authenticated from './middleware/authenticated.js';
import { Users } from './database/database.js';
import { AuthenticationSchema } from './validation/authentication.js';
import { spawn } from 'node:child_process';
import { exec } from 'child_process';
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'node:url';
import path from 'path';
import fs from 'fs';






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

// Email server


var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nistoutput@gmail.com',
        pass: 'qjbcbhltvymgbxhj'
    }
    });

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)




app.get('/', (req,res) => {
    res.send({
        message: 'Welcome to Device Creator API',
        version: `${process.env.npm_package_version}`
    })
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname) //Appending extension
    }
})

const upload = multer({storage: storage})

app.post('/register', (req, res, next) => {
    // Never, ever thrust client side data !
    console.log(req.body)
    const validation = validate(req.body, AuthenticationSchema.register.body);
    if (!validation.valid) {
        return res.status(401).send({
            message: 'Invalid user information',
            errors: validation.errors.map(e => e.stack)
        });
    }

    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            return Users.create(req.body.email, req.body.username, hashedPassword)
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

var id = 0

app.post('/nist',upload.single('recfile'), (req, res) => {
   console.log("filename: " + req.file.filename)

   console.log(req.body.email)

    
    
    res.status(200).send({
        id: ++id
    })
    
    
    var inputs = req.body.inputs.split(",")    // []string -> ['0', 'data/data.pi', '1', '1', '100', '0', ...]
    let cmd = inputs[0]        // []string -> ['100000']
    inputs.shift()
    
    // const args = [0, `../Backend/data/uploads/data.pi`, ...inputs]
    const args = [0, `../Backend/data/uploads/${req.file.filename}`, ...inputs]
    // const args = [0, `data/data.pi`, '1', '0', '10', '0']
    
    console.log(cmd)
    console.log(args)
    console.log('wsl', './assess', cmd)

    // let nist = spawn('wsl', ['ls', '-lsa'], {
    let nist = spawn('wsl', ['./assess', cmd], {
        cwd: '../sts-2.1.2'
    })

    nist.stdin.setEncoding('utf-8')

    nist.stdout.pipe(process.stdout)

    const logging = fs.createWriteStream(`./data/logs/${req.file.filename.split('.')[0]}.log`, { flags: 'a' });
    nist.stdout.pipe(logging);

    let i = 0

    args.forEach((arg) => {
        nist.stdin.write(arg+'\n')
    })



    nist.stdout.on('data', (data) => {
        console.log('stdout')
        console.log(data.toString())
    })

    nist.stderr.on('data', function (data) {
        console.log('stderr: ' + data.toString());
    })
      
    nist.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString()); //if code = 1 dan file ophalen fs 
        var mailOptions
        if(code == 1){
            mailOptions = {
                from: 'nistoutput@gmail.com',
                to: req.body.email,
                subject: 'Latest NIST request succes',
                text: 'This is the output file of your latest NIST request.',
                attachments: [
                    {
                       // filename and content type is derived from path
                        path: __dirname + './../../sts-2.1.2/experiments/AlgorithmTesting/finalAnalysisReport.txt'
                    },
                    {
                        path: __dirname + `./../data/logs/${req.file.filename.split('.')[0]}.log`
                    }
                ]
              };
                
              
              
        }else{
            mailOptions = {
                from: 'nistoutput@gmail.com',
                to: req.body.email,
                subject: 'Latest NIST Request fail',
                text: 'Ur latest NIST request excited with an error, check the variables or file and try again.',
                attachments: [
                {
                    path: __dirname + `./../data/logs/${req.file.filename.split('.')[0]}.log`
                }
            ]
            }
        }
        mail.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    })

    nist.stdin.end()


    console.log('done')

})

app.post('/cmc',upload.single('recfile'), (req, res) => {

    console.log("filename: " + req.file.filename)

    console.log(req.body.email)

    res.status(200).send({
        id: ++id
    })

    let cmc = spawn('wsl', ['ngspice', req.file.filename], {
        cwd: './data/uploads/'
    })

    cmc.stdin.setEncoding('utf-8')

    cmc.stdout.pipe(process.stdout)

    const logging = fs.createWriteStream(`./data/logs/${req.file.filename.split('.')[0]}.log`, { flags: 'a' });
    cmc.stdout.pipe(logging);

    cmc.stdout.on('data', (data) => {
        console.log('stdout')
        console.log(data.toString())
    })

    cmc.stderr.on('data', function (data) {
        console.log('stderr: ' + data.toString());
    })

    cmc.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString()); //if code = 1 dan file ophalen fs 
        var mailOptions
        if(code == 1){
            mailOptions = {
                from: 'nistoutput@gmail.com',
                to: req.body.email,
                subject: 'Latest CMC request succes',
                text: 'This is the output file of your latest CMC request.',
                attachments: [
                    // {
                    //    // filename and content type is derived from path
                    //     path: __dirname + './../../sts-2.1.2/experiments/AlgorithmTesting/finalAnalysisReport.txt'
                    // },
                    {
                        path: __dirname + `./../data/logs/${req.file.filename.split('.')[0]}.log`
                    }
                ]
              };
                
              
              
        }else{
            mailOptions = {
                from: 'nistoutput@gmail.com',
                to: req.body.email,
                subject: 'Latest CMC Request fail',
                text: 'Ur latest CMC request excited with an error, check the variables or file and try again.',
                attachments: [
                {
                    path: __dirname + `./../data/logs/${req.file.filename.split('.')[0]}.log`
                }
            ]
            }
        }
        mail.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    })

    cmc.stdin.end()


    console.log('done')


})


await connect();

app.listen(PORT, () =>{
    console.log(`Express api running at port ${PORT}`)
});

