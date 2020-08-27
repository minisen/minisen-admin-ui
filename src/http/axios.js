import axios from 'axios';
import config from './config';
import { Message } from 'element-ui';
import router from '@/router'

const instance = axios.create({
  baseURL: config.baseUrl,
  headers: config.headers,
  timeout: config.timeout,
  withCredentials: config.withCredentials
});


// response 拦截器
instance.interceptors.response.use(
  res => {

    //blob类型为文件下载对象，不论是什么请求方式，直接返回文件流数据
    if(res.config.responseType === 'blob' || res.config.responseType === 'arraybuffer'){  //下载excel类型
      let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;

      //获取文件名
      let fileName = decodeURI(res.headers['content-disposition'].split("=")[1]);  //处理文件名乱码问题
      downloadElement.download = fileName; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
      return;
    }

    
    let data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (res.data == undefined) {
      data = JSON.parse(res.request.responseText)
    } else {
      data = res.data
      console.log("res")
      console.log(res.data)
    }

    // 根据返回的code值来做不同的处理
    switch (data.status) {
      case 'error':
      {
        if (data.errorMsg == "redirect to login") {

          //jump to login
          sessionStorage.setItem('token', '')
          router.push('/login')
        }

        console.log("data.status = error")

        Message.error(res.data.errorMsg)
        const err = {message:res.data.errorMsg}
        return Promise.reject(err)
      }
      default:
      {
        break
      }
    }

    return res
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }

      console.log("fail-error")
      console.error(err)
      Message.error(err)
    }
    
    return Promise.reject(err)
  }
)

export default instance;