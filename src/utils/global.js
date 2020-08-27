/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
export const baseUrl = 'http://xxxxxxxx/'

//signalr-hub連接地址
export const hubBaseUrl = 'http://xxxxxxxx/'

//session Storage key 統一管理
export const sessionStorageKey = {
    broadcastHubConnectionId: 'broadcastHubConnectionId',
    account: 'account',
    userName: 'userName',
    role: 'role',
    token: 'token',
    setApiPerms: "setApiPerms"

}

export default {
    baseUrl,
    hubBaseUrl,
    sessionStorageKey
}