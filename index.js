var Hapi = require('hapi');
var multiparty = require('multiparty');
var fs = require('fs');

var server = Hapi.createServer(process.env.PORT || 3020);


server.route({
	method: 'post',
	path: '/upload',
	config: {
		payload: {
			maxBytes: 2097152000000000,
			output: 'stream',
			parse: false
		},
		handler: function(request, reply) {
			var form = new multiparty.Form();
			form.parse(request.payload, function(err, fields, files) {
				if (err) return reply(err);
				else upload(files, reply);
			});
		}
	}
});

server.start(function () {
	console.log('Server started on port', server.info.port, 'for environment', process.env.NODE_ENV);
});




/*
 * upload file function
 */

var upload = function(files, reply) {
	fs.readFile(files.file[0].path, function(err, data) {
		// checkFileExist();
		fs.writeFile('./' + files.file[0].originalFilename, data, function(err) {
			if (err) return reply(err);
			else return reply('File uploaded');

		});
	});
};