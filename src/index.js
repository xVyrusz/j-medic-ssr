const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./api/routes/routes');
const {
    logErrors,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFound');
require('./ssr/lib/passport')

//  Server configs
const { config } = require('./config/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './ssr/public')));

// HandleBars
app.set('views', path.join(__dirname, './ssr/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./ssr/lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"],
        },
    },
}));
if (config.dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
router(app);

// Error 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening on: http://localhost:${config.port}`);
});