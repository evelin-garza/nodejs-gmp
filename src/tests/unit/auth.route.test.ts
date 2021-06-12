import request from 'supertest';
import sinon from 'sinon';
import { app } from '../../app';
import AuthService from '../../services/auth-service';

const mockUser = {
  login: 'Kali',
  password: '9McAtIRaCe1uurs'
};

describe('Auth Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return access token', async () => {
    sinon.stub(AuthService.prototype, 'findUser').resolves(mockUser);

    const response = await request(app)
      .post('/api/auth/login')
      .send(mockUser)
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
  });

  it('should return 400 when provider credentials are not valid', async () => {
    sinon.stub(AuthService.prototype, 'findUser').resolves();

    await request(app)
      .post('/api/auth/login')
      .send(mockUser)
      .expect(400);
  });

  it('should return 500 when there is an error', async () => {
    sinon.stub(AuthService.prototype, 'findUser').rejects();

    await request(app)
      .post('/api/auth/login')
      .send(mockUser)
      .expect(500);
  });
});
