const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;

const route = require('./routes');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const db = require('./config/db');

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Teamplate handle engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sorttable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'sort',
                    asc: 'up',
                    desc: 'dowm',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Custom middleware
app.use(SortMiddleware);

route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
