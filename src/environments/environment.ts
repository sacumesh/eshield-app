export const environment = {
  api: {
    key: '4bd5132f-d973-42ee-addb-269bbb04b3f7',
    version: '1.0',
    url: 'http://gateway.local.gd:8080/ActionLearning/',
  },
  keycloakConfig: {
    baseUrl: 'http://auth.local.gd:8080/realms/',
    realm: 'action-learning',
    clientId: 'eshield',
    grantTypes: {
      password: 'password',
      refeshToken: 'refresh_token',
    }
  },
};
