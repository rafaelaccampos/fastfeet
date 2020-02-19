import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Rafaela Campos',
    email: 'rafac@rocket.com.br',
    password_hash: '1234567819',
  });
  return res.json({ user });
});

export default routes;
