// Third party modules
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import bodyParser from "body-parser";

// ES Modules - Fix for _dirname
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

// instantiate app-server
const app = express();

// Setup ViewEngine EJS
app.set('views', path.join(_dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, '../public')));
app.use(session({
    secret: 'MySecret',
    saveUninitialized: false,
    resave: false
}));

// custom middleware
function helloWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};

// custom middleware
function byeWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Good Bye World');
};

// add middleware to connect application
app.use('/hello', helloWorld);
app.use('/bye', byeWorld);

// run app
app.listen(3000);

console.log('Server running at http://localhost:3000');