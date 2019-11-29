// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://10.39.1.163:8891/',
  AuthenticationURL: 'security/authenticate',
  AutorizationURL: 'security/authorize',
  TokenKey: 'SecurityToken',
  OrdersByStateURL: 'http://10.39.1.135:8090/OMS/order/findAllByStatus/',
  OrdersByCustomerIdURL: 'http://10.39.1.135:8090/OMS/order/findByCustomerId/',
  OrdersByIdURL: 'http://10.39.1.135:8090/OMS/order/',
  OrdersByProductIdURL: 'http://10.39.1.135:8090/OMS/order/findByProductId/',
  OrdersBySellingRankingURL: 'http://10.39.1.135:8090/OMS/order/sellingProductRanking',
  OrdersByPaymentRankingURL: 'http://10.39.1.135:8090/OMS/order/paymentRanking/',
  OrdersByMontlyReportURL: 'http://10.39.1.135:8090/OMS/order/monthlyReportByStatus/',
  PostFileURL: 'http://10.39.1.163:9090/saveImage',
  CreateProductURL: 'http://10.39.1.135:9070/v1/Product',
  UpdateProductURL: 'http://10.39.1.135:9070/v1/Product',
  DeleteProductURL: 'http://10.39.1.135:9070/v1/Product/DisableById/',
  GetProductsURL: 'http://10.39.1.135:9070/v1/Product/GetAll/',
  GetProductByIdURL: 'http://10.39.1.135:9070/v1/Product/GetById/',
  GetCustomerByIdentificationURL: 'http://10.39.1.135:8090/OMS/customer/',
  GetCustomerByProductIdURL: 'http://10.39.1.135:8090/OMS/customer/findByProductId/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
