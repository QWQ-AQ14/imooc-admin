const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    // true:存在用户信息
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
