import request from 'superagent'
import { serverError } from '../../constants'


var globalErrorHandler;
var globalLoadingHandler;
var globalLoadingHideHandler;

const XHR = function(conf={}) {

  let method = conf.method || 'get';
  let api    = conf.url;
  let data   = conf.data;
  let succ   = conf.success;
  let error  = conf.error;
  let resHeader = conf.resHeader;
  let loadingFlag = conf.loadingFlag;

  let index = window.location.href.indexOf('mobile_manage');

  const handleEnd = function(err, res) {
    if (res && res.ok && res.body && res.body.code === '200') {
      globalLoadingHideHandler && globalLoadingHideHandler();
      succ && succ(res.body.data, res.body, res.header)
    } else if (res.body && res.body.code === '401') {
      globalErrorHandler && globalErrorHandler(res.body.msg, '请登录');
    } else {
      globalLoadingHideHandler && globalLoadingHideHandler();
      const msg = res && res.body && res.body.msg
      if (index >= 0) {
        // 手机端提示
        dd.device.notification.alert({
          message: msg || '服务器错误',
          title: '订餐',
          buttonName: '知道了'
        })
      } else {
        globalErrorHandler && globalErrorHandler( msg || '服务器错误', '请稍后重试');
      }
      if (error) {
        error(res && res.body)
      }
    }
    
  };
  
  let token = localStorage.token;
  globalLoadingHandler && globalLoadingHandler('从容工作，美食加码');
  if (method === 'get') {
    request[method](api)
      .set("Authorization",token)
      .query(data)
      .end(handleEnd);
  } else {
    request[method](api)
      .set("Content-Type","application/json;charset=UTF-8")
      .set("Authorization",token)
      .send(data)
      .end(handleEnd);
  }
};

export const setGlobalHandler = function(handler){
  globalErrorHandler = handler;
}

export const setGlobalLoadingHandler = function(handler){
  globalLoadingHandler = handler;
}

export const setGlobalLoadingHideHandler = function(handler){
  globalLoadingHideHandler = handler;
}
export default XHR;
