var config = {
	testDependencies: [
		'test/fixtures/**/*',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
		'bower_components/pintxos-inherit/index.js',
		'bower_components/pintxos-destroyable/index.js',
		'bower_components/pintxos-component/index.js',
		'bower_components/pintxos-scrollable_native/index.js',
		'bower_components/pintxos-scrollable_ha/index.js',
		'index.js',
		'test/*.js'
	]
};

module.exports =  require('grunt-pintxos')(config);
