
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  vehicles= require('./routes/api/vehicles'),
  people= require('./routes/api/people'),
  peopleSearch= require('./routes/api/peopleSearch'),
  peopleVehicleCombo= require('./routes/api/peopleVehicleCombo'),
  vehicleByOwner= require('./routes/api/vehicleByOwner'),
  addNewVehicleToOwner= require('./routes/api/addNewVehicleToOwner'),
  invoiceMaker= require('./routes/api/invoiceMaker'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.use('/api/v1/vehicles', vehicles);
app.use('/api/v1/people', people);
app.use('/api/v1/peopleSearch',peopleSearch);
app.use('/api/v1/addNew',peopleVehicleCombo);
app.use('/api/v1/vehicleByOwner',vehicleByOwner);
app.use('/api/v1/addNewVehicleToOwner',addNewVehicleToOwner);
app.use('/api/v1/invoiceMaker',invoiceMaker);





// redirect all others to the index (HTML5 history)
app.get('*', routes.index);



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
