/*
 * @description:
 */
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

  /**
   * 售后订单状态：
   * 1：申请成功，
   * 2：服务端审核确认,
   * 3：拣货员已验货上传图片,
   * 4：为服务端同意退款,
   * 5：(对应2)为服务端审核拒绝,
   * 6：(对应4)服务端拒绝退款,
   * 7：为退款完成
   * 8：已取消
   * 100：已关闭
   */
  SALES_STATE = {
    SUCCESS_APPLY:[1,2,3],
    WAIT_REFOUND:[4,5],
    REJECT:6,
    FINISHED:7,
    CANCELED:8
  }
  SALES_STATE_TEXT = {
    [SALES_STATE.SUCCESS_APPLY[0]]:"申请成功，待商家处理",
    [SALES_STATE.SUCCESS_APPLY[1]]:"申请成功，待商家处理",
    [SALES_STATE.SUCCESS_APPLY[2]]:"申请成功，待商家处理",
    [SALES_STATE.WAIT_REFOUND[1]]:"请将退货商品退还给门店，待商家退款",
    [SALES_STATE.WAIT_REFOUND[2]]:"请将退货商品退还给门店，待商家退款",
    [SALES_STATE.REJECT]:"拒绝申请",
    [SALES_STATE.FINISHED]:"退款成功",
    [SALES_STATE.CANCELED]:"撤销成功"
  }

  constructor () {
  }
}

export default OrderModel
