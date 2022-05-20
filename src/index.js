const express = require("express");
const Sequelize = require("sequelize");
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const passport = require("passport");
const app = express();
const path = require("path");
const flash = require('connect-flash');
const cors = require("cors");
const helmet = require("helmet");
const router = require("./api/routes/routes");
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require("./utils/middlewares/errorHandlers");
const notFoundHandler = require("./utils/middlewares/notFound");
require("./ssr/lib/passport");

//  Server configs
const { config } = require("./config/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./ssr/public")));

// HandleBars
app.set("views", path.join(__dirname, "./ssr/views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./ssr/lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(flash());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
        ],
      },
    },
  })
);
if (config.dev) {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

var sequelize = new Sequelize("j_medic", "7yo49arkhjsp", "pscale_pw_BFtyLKYVT1tWNSOOj5lJjgKd6kqjvQ_MTBHkF3_TGQE", {
  host: "j3xkv6v3j3ax.us-west-2.psdb.cloud",
  port: 3306,
  logging: console.log,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // very important
    }
  }
});

var myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "medic",
    saveUninitialized: false,
    store: myStore,
    resave: false
  })
);
myStore.sync();
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

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
