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

export const RESP_MESSAGE_TYPE = {
  VOICE: { v: 1, l: 'Voice' },
  PICTURE: { v: 2, l: 'Picture' },
  VIDEO: { v: 3, l: 'Video' },
}

export const RESP_FROM_TYPE = {
  MODEL: { v: 1, l: 'Model' },
  USER: { v: 2, l: 'User' },
}

export default {
  SUBSCRIPTION_TYPE,
  ORDER_PAYMENT_STATUS,
}
