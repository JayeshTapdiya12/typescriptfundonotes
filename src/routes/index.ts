import express, { IRouter } from 'express';
const router = express.Router();
const { swaggerUi, swaggerSpec } = require('../swagger/swagger');

import userRoute from './user.route';
import NoteRoutes from './notes.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  router.use('/users', new userRoute().getRoutes());
  router.use('/note', new NoteRoutes().getRoutes());

  return router;
};

export default routes;
