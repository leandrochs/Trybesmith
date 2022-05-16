import JwsConfig from '../interfaces/jwsConfig.interface';

const jwsConfig: JwsConfig = {
  secret: 'superSecret',
  configs: { algorithm: 'HS256', expiresIn: '1d' },
};

export default jwsConfig;
