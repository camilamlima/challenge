
var express = require('express');
var app = express();
var cart = require('./products.json');

//setting middleware
app.use(express.static(__dirname)); //Serves resources from root folder

app.get('/cart-data', function (req, res) {
    
    res.send(cart);
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Node server is running..');
  console.log('Express server listening on port ' + server.address().port);
});
