var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('HTML/index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SearchIT server running on port ${port}`));
