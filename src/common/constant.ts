export const SUBSCRIPTION_TYPE = {
  MONTH: { v: 1, l: 'Month' },
  YEAR: { v: 2, l: 'Year' },
  POINT: { v: 3, l: 'Point' },
}

export const ORDER_PAYMENT_STATUS = {
  UNPAID: { v: 1, l: 'Unpaid' },
  PAID: { v: 100, l: 'Paid' },
  OVERDUE: { v: 80, l: 'Overdue' },
  FAILED: { v: 90, l: 'Failed' },
}

export default {
  SUBSCRIPTION_TYPE,
  ORDER_PAYMENT_STATUS,
}
