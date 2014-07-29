var util = require('util'),
	path = require('path'),
	_ = require('lodash'),
	utils = require('landmark-utils'),
	colors = require('colors'),
	yeoman = require('yeoman-generator');


var LandmarkGenerator = module.exports = function LandmarkGenerator(args, options, config) {
	
	// Apply the Base Generator
	yeoman.generators.Base.apply(this, arguments);
	
	// Welcome
	console.log('\nWelcome to Landmark Connect.\n');
	
	// This callback is fired when the generator has completed,
	// and includes instructions on what to do next.
	var done = _.bind(function done() {
		console.log(
			'\n------------------------------------------------' +
			'\n' +
			'\nYour Landmark Connect project is ready to go!' +
			'\n' +
			'\nFor help getting started, visit http://getlandmarkproject.com/getting-started' +

			((this.usingDemoAPI) ?
				'\n' +
				'\nWe\'ve included demo API data for your app, which is reset daily.' +
				'\nPlease configure your own server instead' +
				'\nbefore sending your app live.'
				: '') +

			'\n\nTo simulate the app in your web browser, navigate to the "www" folder and run "python -m SimpleHTTPServer 8000".' +
			'\nTo run a build for iOS or Android, run "ionic build [platform]".' +
			'\n');
		
	}, this);
	
	// Install Dependencies when done
	this.on('end', function () {
		
		this.installDependencies({
			bower: false,
			skipMessage: true,
			skipInstall: options['skip-install'],
			callback: done
		});
		
	});
	
	// Import Package.json
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
	
};

// Extends the Base Generator
util.inherits(LandmarkGenerator, yeoman.generators.Base);

LandmarkGenerator.prototype.prompts = function prompts() {
	
	var cb = this.async();
	
	var prompts = {
		
		project: [
			{
				name: 'projectName',
				message: 'What is the name of your app?',
				default: 'My App'
			}, {
				name: 'organizationName',
				message: 'What is the name of your organization/company?',
				default: 'City of Gotham'
			}, {
				name: 'organizationUrl',
				message: 'What is your organizations website URL?',
				default: 'http://gotham.gov'
			}, {
				name: 'organizationEmail',
				message: 'What is the main email address for the project?',
				default: 'landmark@gotham.gov'
			}
		],
		
		config: []
		
	};
	
	this.prompt(prompts.project, function(props) {
		
		_.each(props, function(val, key) {
			this[key] = val;
		}, this);
		
		// Keep an unescaped version of the variables
		this._projectName = this.projectName;
		this._organizationName = this.organizationName;
		this._organizationUrl = this.organizationUrl;
		this._organizationEmail = this.organizationEmail;
		// ... then escape them for use in strings (most cases)
		this.projectName = utils.escapeString(this.projectName);
		this.organizationName = utils.escapeString(this.organizationName);
		this.organizationUrl = utils.escapeString(this.organizationUrl);
		this.organizationEmail = utils.escapeString(this.organizationEmail);

		prompts.config.push({
			name: 'landmarkJSUrl',
			message: '------------------------------------------------' +
				'\n    Landmark Connect integrates with LandmarkJS for feeding the app with' +
				'\n    data. See http://getlandmarkproject.com/guide/config/#cloudinary for more info.' +
				'\n    ' +
				'\n    You can skip this for now (we\'ll include demo API)' +
				'\n    ' +
				'\n    Please enter your LandmarkJS site URL without trailing slash:' +
				'\n    Example: http://landmarkjs-demo.herokuapp.com'
		});

		if (!prompts.config.length) {
			return cb();
		}
		
		this.prompt(prompts.config, function(props) {
			
			_.each(props, function(val, key) {
				this[key] = val;
			}, this);
			
			if (!this.cloudinaryURL) {
				this.usingDemoAPI = true;
				this.landmarkJSUrl = 'http://landmarkjs-demo.herokuapp.com';
			}
			
			cb();
			
		}.bind(this));
		
	}.bind(this));
	
};

LandmarkGenerator.prototype.guideComments = function() {
	
	var cb = this.async();
	
	this.prompt([
		{
			type: 'confirm',
			name: 'includeGuideComments',
			message: '------------------------------------------------' +
				'\n    Finally, would you like to include extra code comments in' +
				'\n    your project? If you\'re new to Landmark, these may be helpful.',
			default: true
		}
	], function(props) {
		
		this.includeGuideComments = props.includeGuideComments;
		cb();
		
	}.bind(this));
	
};

LandmarkGenerator.prototype.keys = function keys() {
	
	var cookieSecretChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()-=_+[]{}|;:",./<>?`~';
	
	this.cookieSecret = utils.randomString(64, cookieSecretChars);
	
};

LandmarkGenerator.prototype.project = function project() {
	
	this.template('_config.json', 'config.json');
	this.template('_package.json', 'package.json');
	
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	
	this.copy('gulpfile.js');
	this.copy('icon-iTunesArtwork@2x.png');
	
};

LandmarkGenerator.prototype.app = function templates() {
	
	this.mkdir('www');
	
	this.directory('www/assets');
	this.directory('www/css');
	
	this.mkdir('www/js');
	this.copy('www/js/app.js');
	this.copy('www/js/controllers.js');
	this.copy('www/js/directives.js');
	this.copy('www/js/filters.js');
	this.template('www/js/_services.js', 'www/js/services.js');
	
	this.directory('www/lib');
	this.directory('www/templates');
	
	this.copy('www/index.html');
};

LandmarkGenerator.prototype.resources = function routes() {
	
	this.directory('res');
	
};

LandmarkGenerator.prototype.styles = function routes() {
	
	this.directory('scss');
	
};

LandmarkGenerator.prototype.files = function files() {
	
	this.directory('public');
	
};
