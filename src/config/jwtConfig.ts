type JwsConfig = {
  secret: string;
  configs: object;
  userId?: number
};

const jwsConfig: JwsConfig = {
  secret: 'superSecret',
  configs: { algorithm: 'HS256', expiresIn: '1d' },
};

export default jwsConfig;
