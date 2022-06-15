import request from '@/utils/request'

/**
 * 登录
 * return Promise
 */

export const login = (data) => {
  return request({
    url: 'http://127.0.0.1:3007/api/login',
    method: 'POST',
    data
  })
}
