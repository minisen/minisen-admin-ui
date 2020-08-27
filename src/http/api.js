/* 
 * 接口统一集成模块
 */
import * as login from './moudules/sys/login'
import * as menu from './moudules/sys/menu'
import * as permission from './moudules/sys/permission'
import * as account from './moudules/sys/account'
import * as dictionary from './moudules/sys/dictionary'
import * as role from './moudules/sys/role'
import * as message from './moudules/sys/message'
import * as department from './moudules/sys/department'
import * as article from './moudules/blog/article'

/**
 * 如果希望 hasPermission 判断的结果为flase,可以在 v-has 加上这个参数
 */
const NoPerm = {
    p: ['No Permission']
}

// 默认全部导出
export default {
    NoPerm,
    login,
    menu,
    permission,
    account,
    dictionary,
    role,
    message,
    department,
    article
}