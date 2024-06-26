export enum ORDER_ERROR_ENUM {
  ORDER_NOT_FOUND = 'Order does not exist',
  ORDERS_NOT_FOUND = 'Cannot find any orders',
  CREATE_ORDER_FAILED = 'Create order failed',
  EMPTY_CUSTOMER_NAME = 'customerName should not be empty',
  EMPTY_PHONE_NUMBER = 'phoneNumber should not be empty',
  INVALID_EMAIL = 'email is invalid',
  EMPTY_ADDRESS = 'address should not be empty',
  INVALID_ORDER_ID = 'Order ID must be uuid',
  INVALID_ORDER_ITEM_ID = 'Order item ID must be uuid',
  INVALID_PRODUCT_ID = 'Product ID must be uuid',
  MIN_QUANTITY = 'quantity should be >= 1',
  EMPTY_STATUS = 'status should not be empty',
  MIN_TOTAL = 'minTotal should be >= 1',
  MAX_TOTAL = 'minTotal should be >= 1',
  MIN_ORDER_ITEM = 'Order must have at least 1 product',
}
