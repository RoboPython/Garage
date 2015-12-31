
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  login = require('./routes/login'),
  vehicles= require('./routes/api/vehicles'),
  invoices = require('./routes/api/invoices'),
  people= require('./routes/api/people'),
  bugs= require('./routes/api/bugs'),
  peopleSearch= require('./routes/api/peopleSearch'),
  invoiceNumber= require('./routes/api/invoiceNumber'),
  peopleVehicleCombo= require('./routes/api/peopleVehicleCombo'),
  vehicleByOwner= require('./routes/api/vehicleByOwner'),
  invoiceByVehicle= require('./routes/api/invoiceByVehicle'),
  addNewVehicleToOwner= require('./routes/api/addNewVehicleToOwner'),
  invoiceMaker= require('./routes/api/invoiceMaker'),
  http = require('http'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
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


passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
	}
));






app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
//
app.use('/login', login);
//
app.use('/api/v1/vehicles', vehicles);
app.use('/api/v1/people', people);
app.use('/api/v1/invoices', invoices);
app.use('/api/v1/bugs', bugs);
app.use('/api/v1/peopleSearch',peopleSearch);
app.use('/api/v1/addNew',peopleVehicleCombo);
app.use('/api/v1/vehicleByOwner',vehicleByOwner);
app.use('/api/v1/invoiceByVehicle',invoiceByVehicle);
app.use('/api/v1/addNewVehicleToOwner',addNewVehicleToOwner);
app.use('/api/v1/invoiceMaker',invoiceMaker);
app.use('/api/v1/invoiceNumber',invoiceNumber);






// redirect all others to the index (HTML5 history)
app.get('*', routes.index);



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
