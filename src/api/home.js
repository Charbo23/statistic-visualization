import Ajax from '../utils/ajax'

export default {
  map: (data) => {
    return Ajax({
      url: '/data/map',
      method: 'post',
      data
    })
  },
  orderList: (data) => {
    return Ajax({
      url: '/data/order',
      method: 'post',
      data
    })
  },
  // 经销商增长
  merchant: (data) => {
    return Ajax({
      url: '/data/merchant',
      method: 'post',
      data
    })
  },
  // 套餐分布
  type: (data) => {
    return Ajax({
      url: '/data/type',
      method: 'post',
      data
    })
  },
  // 设备状态
  status: (data) => {
    return Ajax({
      url: '/data/status',
      method: 'post',
      data
    })
  },
  // 业态分布
  format: (data) => {
    return Ajax({
      url: '/data/format',
      method: 'post',
      data
    })
  },
  // 水量统计
  water: (data) => {
    return Ajax({
      url: '/data/water',
      method: 'post',
      data
    })
  },
  // 收益对比
  money: (data) => {
    return Ajax({
      url: '/data/money',
      method: 'post',
      data
    })
  },
}