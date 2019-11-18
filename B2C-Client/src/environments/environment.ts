// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://10.39.1.135:8090/',
  //baseURL: 'http://10.39.1.163:8891/',
  AuthenticationURL: 'security/authenticate',
  AutorizationURL: 'security/authorize',
  OrdersURL: 'OMS/order/findByCustomerId/1?ordering=asc&page=1&results=2',
  OrderURL: 'OMS/order/',
  CustomerURL: 'OMS/customer/',
  UpdateCustomerURL: 'OMS/customer',
  TokenKey: 'SecurityToken'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
