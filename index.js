const express = require('express');
const morgan = require('morgan');

//create an express app.

const app = express();
const port = process.env.PORT || 3000;

// logging

app.use(morgan('dev'));

//public use
app.use(express.static(`${__dirname}/public`));

//where we store our files
app.set('views', `${__dirname}/views`);

//template
app.set('view engine', 'ejs');

//homepage
app.get('/', (req, res) => res.render('Home'));

app.listen(port, () => console.log(`Express has started on ${port}`));
