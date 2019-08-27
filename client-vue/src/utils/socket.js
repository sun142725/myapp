/* eslint-disable */
import io from 'socket.io-client'
import store from 'store'
function mySocket () {
    console.log(111)
    var socket = null
    var mySocket = {
        login: function(loginInfo, listeners, cbOk, cbErr) {
        },
        sendMsg () {
        },
        logout (loginInfo, cbOk, cbErr) {
        },
        checkLogin () {
        },
        Log: null
    }
    console.log(333, mySocket);
    // console.log(mySocket)
    (function (mySocket) {
      //  最大自动连接次数
        var MAX_CONNECT_COUNT = 3
        //表情标识字符和索引映射关系对象，用户可以自定义
        var emotionDataIndexs = {
          "[惊讶]": 0,
          "[撇嘴]": 1,
          "[色]": 2,
          "[发呆]": 3,
          "[得意]": 4,
          "[流泪]": 5,
          "[害羞]": 6,
          "[闭嘴]": 7,
          "[睡]": 8,
          "[大哭]": 9,
          "[尴尬]": 10,
          "[发怒]": 11,
          "[调皮]": 12,
          "[龇牙]": 13,
          "[微笑]": 14,
          "[难过]": 15,
          "[酷]": 16,
          "[冷汗]": 17,
          "[抓狂]": 18,
          "[吐]": 19,
          "[偷笑]": 20,
          "[可爱]": 21,
          "[白眼]": 22,
          "[傲慢]": 23,
          "[饿]": 24,
          "[困]": 25,
          "[惊恐]": 26,
          "[流汗]": 27,
          "[憨笑]": 28,
          "[大兵]": 29,
          "[奋斗]": 30,
          "[咒骂]": 31,
          "[疑问]": 32,
          "[嘘]": 33,
          "[晕]": 34
        };
        /************ */
        mySocket.emotionDataIndexs = emotionDataIndexs;
        mySocket.MAX_CONNECT_COUNT = MAX_CONNECT_COUNT

        var reconnectCount = 0;
        var log = new function () {
            console.error(222);
            var on = true;
    
            this.setOn = function (onFlag) {
              on = onFlag;
            };
    
            this.getOn = function () {
              return on;
            };
    
            this.error = function (logStr) {
              try {
                on && console.error(logStr);
              } catch (e) {
              }
            };
            this.warn = function (logStr) {
              try {
                on && console.warn(logStr);
              } catch (e) {
              }
            };
            this.info = function (logStr) {
              try {
                on && console.info(logStr);
              } catch (e) {
              }
            };
            this.debug = function (logStr) {
              try {
                on && console.debug(logStr);
              } catch (e) {
              }
            };
          };
        log.warn(mySocket);
        
        log.error("获取下载地址失败");
          /**************** */
        var proto_login = function(loginInfo,listeners, cbOk, cbErr){
            socket = io.connect('http://localhost:666?mobile='+loginInfo.mobile)
            console.log(socket)
            socket.on('connect', ()=>{
                log.warn(socket);
                cbOk && cbOk(socket)
              })
            socket.on('groupMsgNotify', function(data){
              // addChatHistory
              console.log('groupMsgNotify', data)
              store.dispatch('addChatHistory', data)
              log.info('groupMsgNotify', data);
            });
            socket.on('disconnect', function(){
                log.warn('断开连接 disconnect');
            });
            socket.on('connect_timeout', function(){
              log.warn('连接超时 connect_timeout');
            });
            socket.on('error', function(){
              log.warn('连接错误 error');
            });
            socket.on('reconnect', function(attemptNumber){
              reconnectCount=0;
              log.warn('重新连接成功 reconnect' + attemptNumber);
            });
            socket.on('reconnect_attempt', function(attemptNumber){
              log.warn('试图重新连接 reconnect_attempt' + attemptNumber);
            });
            socket.on('reconnecting', function(attemptNumber){
              log.warn('试图重新连接时 reconnecting' + attemptNumber);
            });
            socket.on('reconnect_error', function(err){
              ++reconnectCount;
              console.log(reconnectCount, mySocket.MAX_CONNECT_COUNT)
              if(reconnectCount >= mySocket.MAX_CONNECT_COUNT){
                console.log('超过最大字顺');
                socket.close();
              }
              log.warn('重新连接失败 reconnect_error' + err);
            });
            socket.on('reconnect_failed', function(err){
              log.warn('无法重新连接 reconnect_failed' + err);
            });
            socket.on('ping', () => {
              // log.warn('ping');
            });
            socket.on('pong', (latency) => {
              // log.warn('pong');
            });
        };
        // 发送群消息
        var proto_sendMsg = function (options, cbOk, cbErr){
            socket.emit('groupMsgNotify-c', {
                room_id: options.room_id || '183347713581565764374222',
                type: options.type || 'text',
                content: options.content,
                describe: options.describe,
                send_mobile: options.send_mobile
            });
        };
        var proto_logout = function(loginInfo){
          socket.close()
        };
        var proto_checkLogin = function(){
          return socket && socket.connected;
        };
        /******************** */
        
        mySocket.Log = log
        /**************************************/
        mySocket.login = function (loginInfo, listeners, cbOk, cbErr) {
            proto_login(loginInfo,listeners, cbOk, cbErr);
        };
        mySocket.sendMsg = function (options, cbOk, cbErr) {
            return proto_sendMsg(options, cbOk, cbErr);
        };
        mySocket.logout = function (options, cbOk, cbErr) {
          return proto_logout(options, cbOk, cbErr);
        };
        mySocket.checkLogin = function (options, cbOk, cbErr) {
          return proto_checkLogin();
        };
    }(mySocket))
    return mySocket;
}
export default mySocket();
