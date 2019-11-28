// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AuthenticationURL: 'http://10.39.1.163:8891/security/authenticate',
  AutorizationURL: 'http://10.39.1.163:8891/security/authorize',
  GetProducstByCodeURL: 'http://10.39.1.135:9070/v1/Product/GetByCode/',
  GetProducstByCriteriaURL: 'http://10.39.1.135:9070/v1/Product/GetByCriteria/',
  GetAllProducstURL: 'http://10.39.1.135:9070/v1/Product/GetAll/',
  GetProducstByIdURL: 'http://10.39.1.135:9070/v1/Product/GetById/',
  GetCustomerByEmailURL: 'http://10.39.1.163:8893/OMS/customer/findByEmail/',
  UpdateCustomerURL: 'http://10.39.1.163:8893/OMS/customer/',
  CreateCustomerURL: 'http://10.39.1.163:8893/OMS/customer',
  CreateOrder: 'http://10.39.1.163:8893/OMS/order',
  GetOrdersByCustomer: 'http://10.39.1.163:8893/OMS/order/findByCustomerId/',
  GetOrderById: 'http://10.39.1.163:8893/OMS/order/',
  GetActiveOffers: 'http://10.39.1.135:9080/v1/Offer/GetActive/',
  UpdateStateOrderURL: 'http://10.39.1.163:8893/OMS/order/updateStatus/',
  TokenKey: 'SecurityToken',
  UserKey: 'UserKey',
  IdKey: 'IdKey',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
