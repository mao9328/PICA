export const environment = {
  production: true,
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
  GetProducstByCodeURL: 'http://10.39.1.135:9070/v1/Product/GetByCode/',
  GetProducstByCriteriaURL: 'http://10.39.1.135:9070/v1/Product/GetByCriteria/',

  GetCustomerByIdentificationURL: 'http://10.39.1.135:8090/OMS/customer/',
  GetCustomerByIdURL: 'http://10.39.1.135:8090/OMS/customer/',
  GetCustomerByProductIdURL: 'http://10.39.1.135:8090/OMS/customer/findByProductId/',
  GetCustomerPaymentRanking: 'http://10.39.1.135:8090/OMS/customer/paymentRanking',
  UpdateCustomerURL: 'http://10.39.1.163:8893/OMS/customer/',
  UpdateTypeCustomerURL: 'http://10.39.1.163:8893/OMS/customer/updateType/',
  CreateCustomerURL: 'http://10.39.1.163:8893/OMS/customer/',

  GetActiveOfferURL: 'http://10.39.1.135:9080/v1/Offer/GetActive/',
  CreateOfferURL: 'http://10.39.1.135:9080/v1/Offer',
  UpdateOfferURL: 'http://10.39.1.135:9080/v1/Offer',
  GetOfferByIdURL: 'http://10.39.1.135:9080/v1/Offer/GetById/'
};
