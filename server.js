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

// Import Router
import indexRouter from './app/routes/index.route.server.js';

// instantiate app-server
const app = express();

// Setup ViewEngine EJS
app.set('views', path.join(_dirname, 'app/views'));
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

app.use('/', indexRouter)

// run app
app.listen(3000);

console.log('Server running at http://localhost:3000');