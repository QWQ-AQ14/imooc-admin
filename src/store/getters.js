const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    // true:存在用户信息
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
