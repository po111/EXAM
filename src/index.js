import express, { urlencoded } from 'express';
import homeController from './controllers/homeController.js';
import handlebars from 'express-handlebars';

import routes from './routes.js';
import initDatabase from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddleware.js';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Init express
const app = express();

//Init database
initDatabase();

//Setup static middleware
app.use(express.static('src/public'));

//Use cookie-parser
app.use(cookieParser());

//Use body parser
app.use(express.urlencoded());

//config handlebars a view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));

//set handlebars as default view engine
app.set('view engine', 'hbs');

//Change default views directory
//app.set('views', 'src/views');
app.set('views', path.join(__dirname, 'views'));

//Use auth middleware
app.use(auth);

//Add routes
app.use(routes);


app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));