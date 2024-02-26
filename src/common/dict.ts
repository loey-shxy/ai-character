import Dict from '../common/constant'

export const subscriptionType = {
  func: (value: number) => {
    const target = Object.values(Dict.SUBSCRIPTION_TYPE).filter((item) => {
      return item.v === value
    })
    return target.length ? target[0].l : value
  },
}

export const orderPaymentStatus = {
  func: (value: number) => {
    const target = Object.values(Dict.ORDER_PAYMENT_STATUS).filter((item) => {
      return item.v === value
    })
    return target.length ? target[0].l : value
  },
}
