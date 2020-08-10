import Ajax from '../utils/ajax'

export default {
  login: (data) => {
    return Ajax({
      url: '/data/login',
      method: 'post',
      data
    })
  }
}