/* eslint-disable */
import io from 'socket.io-client'
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
        Log: null
    }
    console.log(333, mySocket);
    // console.log(mySocket)
    (function (mySocket) {
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
            socket.on('connect', ()=>{
                log.warn(socket);
                cbOk && cbOk(socket)
              })
            socket.on('groupMsgNotify', function(data){
                log.info('groupMsgNotify', data);
            });
            socket.on('disconnect', function(){
                log.warn('断开连接');
            })
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

        };
        /******************** */
        // mySocket.Log = log
        /**************************************/
        mySocket.login = function (loginInfo, listeners, cbOk, cbErr) {
            proto_login(loginInfo,listeners, cbOk, cbErr);
        };
        mySocket.sendMsg = function (options, cbOk, cbErr) {
            return proto_sendMsg(options, cbOk, cbErr);
        };
    }(mySocket))
    return mySocket;
}
export default mySocket();
