import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../swagger_documentation.json';

const routes = new Router();

routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

export default routes;