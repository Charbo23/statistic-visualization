import Ajax from '../utils/ajax'

export default {
  map: (data) => {
    return Ajax({
      url: '/data/map',
      method: 'post',
      data
    })
  },
}