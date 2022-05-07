
const
	config = require('config'),
	swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
	swaggerDefinition: {
		persistAuthorization: true,
		info: {
			title: 'Legistify Parking Lot Management Rest APIs',
			version: '2.0.0',
			description: ''
		},
		schemes: ['http'],
		host: 'localhost:' + config.get('node_port'),
		basePath: '/api/v1/'
	},
	apis: ['src/asserts/documentation.yaml']
});