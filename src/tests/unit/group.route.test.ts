import request from 'supertest';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

import { app } from '../../app';
import GroupService from '../../services/group-service';

const mockAccessToken = jwt.sign({ login: 'login' }, 's3cr3t');
const mockGroups = [{
  id: '60b7139e-0d49-45fe-ab0e-ca443557f542',
  name: 'Admin',
  permissions: []
}];

const mockGroup = {
  name: 'Role',
  permissions: ['READ']
};

describe('Group Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET groups', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .get('/api/groups')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .get('/api/groups')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should get all groups', async () => {
      sinon.stub(GroupService.prototype, 'getGroups').resolves(mockGroups);

      await request(app)
        .get('/api/groups')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(mockGroups)
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(GroupService.prototype, 'getGroups').rejects('Error');

      await request(app)
        .get('/api/groups')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });

  describe('GET group by id', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .get('/api/groups/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .get('/api/groups/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 404 when group not found', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves();

      await request(app)
        .get('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(404);
    });

    it('should get group by id', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves(mockGroups[0]);

      await request(app)
        .get('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(mockGroups[0])
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').rejects('Error');

      await request(app)
        .get('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });

  describe('POST create group', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .post('/api/groups')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .post('/api/groups')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should create new group', async () => {
      sinon.stub(GroupService.prototype, 'createGroup').resolves(mockGroups[0]);

      await request(app)
        .post('/api/groups')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockGroup)
        .expect(mockGroups[0])
        .expect(201);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(GroupService.prototype, 'createGroup').rejects('Error');

      await request(app)
        .post('/api/groups')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockGroup)
        .expect(500);
    });
  });

  describe('PUT update group', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .put('/api/groups/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .put('/api/groups/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 404 when group not found', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves();

      await request(app)
        .put('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockGroup)
        .expect(404);
    });

    it('should update group by id', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves(mockGroups[0]);
      sinon.stub(GroupService.prototype, 'updateGroup').resolves([1, mockGroups]);

      await request(app)
        .put('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockGroup)
        .expect(mockGroups[0])
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(GroupService.prototype, 'updateGroup').rejects('Error');

      await request(app)
        .put('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .send(mockGroup)
        .expect(500);
    });
  });

  describe('DELETE group', () => {
    it('should return 401 when authorization token is not provided', async () => {
      await request(app)
        .delete('/api/groups/1')
        .expect(401);
    });

    it('should return 403 when authorization token is not valid', async () => {
      await request(app)
        .delete('/api/groups/1')
        .set('Authorization', 'Invalid token')
        .expect(403);
    });

    it('should return 404 when group not found', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves();

      await request(app)
        .delete('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(404);
    });

    it('should delete group by id', async () => {
      sinon.stub(GroupService.prototype, 'getGroupById').resolves(mockGroups[0]);
      sinon.stub(GroupService.prototype, 'deleteGroup').resolves(1);

      await request(app)
        .delete('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect('"Group deleted successfully."')
        .expect(200);
    });

    it('should return 500 when there is an error', async () => {
      sinon.stub(GroupService.prototype, 'deleteGroup').rejects('Error');

      await request(app)
        .delete('/api/groups/1')
        .set('Authorization', `Bearer ${mockAccessToken}`)
        .expect(500);
    });
  });
});
