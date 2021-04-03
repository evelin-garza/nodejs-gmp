import express from 'express';
import * as UserService from '../services/user-service';

const router = express.Router();

router.get('/api/users', function (req, res) {
  UserService.getUsers().then(
    response => res.status(200).json(response),
    err => res.status(400).json('Bad Request: ' + err),
  );
});

router.get('/api/user/:id', function (req, res) {
  const { id } = req.params;
  UserService.getUserById(id).then(
    response => res.status(200).json(response),
    err => res.status(400).json('Bad Request: ' + err),
  );
});

router.post('/api/user', function (req, res) {
  UserService.createUser(req.body).then(
    response => res.status(200).json(response),
    err => res.status(400).json('Bad Request: ' + err),
  );
});

router.put('/api/user', function (req, res) {
  UserService.updateUser(req.body).then(
    response => res.status(200).json(response),
    err => res.status(400).json('Bad Request: ' + err),
  );
});

router.delete('/api/user/:id', function (req, res) {
  const { id } = req.params;
  UserService.deleteUser(id).then(
    response => res.status(200).json(response),
    err => res.status(400).json('Bad Request: ' + err),
  );
});

export { router as UserRoutes }