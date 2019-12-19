class OrderModel {
  /**
    订单状态：
    0:  已取消;
    10: 待付款;
    20: 待提货;
    40: 已提货;
  */
  ORDER_STATE = {
    CANCELED: 0,
    UNPAID: 10,
    UNDELIVERY: 20,
    FINISHED: 40
  }

  ORDER_STATE_TEXT = {
    [ORDER_STATE.CANCELED]: '已取消',
    [ORDER_STATE.UNPAID]: '待付款',
    [ORDER_STATE.UNDELIVERY]: '待提货',
    [ORDER_STATE.FINISHED]: '已提货'
  }

  constructor () {
  }
}

export default OrderModel
