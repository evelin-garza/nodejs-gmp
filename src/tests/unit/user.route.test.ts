import request from 'supertest';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import UserService from '../../services/user-service';
import { app } from '../../app';

const mockAccessToken = jwt.sign({ login: 'login' }, 's3cr3t');
const mockUsers = [{
  id: 1,
  login: 'Carolina',
  password: '7JDUKYYAZq6bRyY',
  age: 25,
  isDeleted: false
}];

const mockUser = {
  login: 'Kali',
  password: '9McAtIRaCe1uurs',
  age: 69
};

describe('User Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET users', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .get('/api/users')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .get('/api/users')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should get all users', async () => {
      sinon.stub(UserService.prototype, 'getUsers').resolves(mockUsers);

      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(mockUsers)
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'getUsers').rejects('Error');

      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });

  describe('GET user by id', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .get('/api/users/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .get('/api/users/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 400 when id is not a number', async () => {
      await request(app)
        .get('/api/users/id')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(400);
    });

    it('should return 404 when user not found', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves();

      await request(app)
        .get('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(404);
    });

    it('should get user by id', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves(mockUsers[0]);

      await request(app)
        .get('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(mockUsers[0])
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'getUserById').rejects('Error');

      await request(app)
        .get('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });

  describe('POST create user', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .post('/api/users')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .post('/api/users')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should create new user', async () => {
      sinon.stub(UserService.prototype, 'createUser').resolves(mockUser);

      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(mockUser)
        .expect(201);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'createUser').rejects('Error');

      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(500);
    });
  });

  describe('PUT update user', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .put('/api/users/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .put('/api/users/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 400 when id is not a number', async () => {
      await request(app)
        .put('/api/users/id')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(400);
    });

    it('should return 404 when user not found', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves();

      await request(app)
        .put('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(404);
    });

    it('should update user by id', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves(mockUser);
      sinon.stub(UserService.prototype, 'updateUser').resolves([1, mockUsers]);

      await request(app)
        .put('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(mockUsers[0])
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'updateUser').rejects('Error');

      await request(app)
        .put('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockUser)
        .expect(500);
    });
  });

  describe('GET Add Users To Group', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .post('/api/users/addToGroup')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .post('/api/users/addToGroup')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should add user to group', async () => {
      sinon.stub(UserService.prototype, 'addUsersToGroup').resolves(mockUsers);

      await request(app)
        .post('/api/users/addToGroup')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send({
          groupId: 'efa817b8-f6e3-48a3-bc5a-1458eec13885',
          userIds: [1]
        })
        .expect(mockUsers)
        .expect(201);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'addUsersToGroup').rejects('Error');

      await request(app)
        .post('/api/users/addToGroup')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send({
          groupId: 'efa817b8-f6e3-48a3-bc5a-1458eec13885',
          userIds: [1]
        })
        .expect(500);
    });
  });

  describe('DELETE soft delete user', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .delete('/api/users/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .delete('/api/users/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 400 when id is not a number', async () => {
      await request(app)
        .delete('/api/users/id')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(400);
    });

    it('should return 404 when user not found', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves();

      await request(app)
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(404);
    });

    it('should delete user by id', async () => {
      sinon.stub(UserService.prototype, 'getUserById').resolves(mockUser);
      sinon.stub(UserService.prototype, 'deleteUser').resolves([1, mockUsers]);

      await request(app)
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(mockUsers[0])
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(UserService.prototype, 'deleteUser').rejects('Error');

      await request(app)
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });
});
