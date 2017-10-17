export const variables = {
  VERSION: '1',
  AUTHORIZATION: 'token',
  LANGUAGE: process.env.LANGUAGE,

  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
  },


  domainUrl: process.env.DOMAIN_URL
};

export default variables;
