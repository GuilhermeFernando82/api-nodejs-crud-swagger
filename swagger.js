const swaggerAutogen = require('swagger-autogen')()

swaggerAutogen('./swagger-output.json', ['./src/routes/api.ts']);