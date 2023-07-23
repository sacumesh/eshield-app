import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://192.168.5.248:8080/auth',
        realm: 'RealmSachiththa',
        clientId: 'eshield-app',
      },
      initOptions: {
        checkLoginIframe: false,
      },
    });
}
