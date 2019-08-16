/* eslint-disable */
import http from '@/config/http'
//  发起好友请求
export function requestFriend(data) {
    return http.post('/requestFriend', {
        mobile: data.mobile,
        friend_mobile: data.friend_mobile,
    })
}

//  获取用户信息
export function getUserInfo(data) {
    return http.get('/getUserInfo', {
        mobile: data.mobile,
    })
}

//  修改用户实名认证
export function modifyUserVerify(data) {
    return http.post('/modifyUserVerify', {
        mobile: data.mobile,
        name: data.name,
        idCardNo: data.idCardNo,
    })
}

//  修改用户信息
export function modifyUserInfo(data) {
    return http.post('/modifyUserInfo', {
        mobile: data.mobile,
        nickName: data.nickName,
        age: data.age,
    })
}

//  忘记密码
export function forget(data) {
    return http.post('/forget', {
        mobile: data.mobile,
        password: data.password,
        passwordAlign: data.passwordAlign,
    })
}

//  修改密码
export function modify(data) {
    return http.post('/modify', {
        mobile: data.mobile,
        password: data.password,
        newPassword: data.newPassword,
        newPasswordAlign: data.newPasswordAlign,
    })
}

//  注册账号
export function register(data) {
    return http.post('/register', {
        mobile: data.mobile,
        password: data.password,
        passwordAlign: data.passwordAlign,
    })
}
// 登陆
export function login(data) {
    return http.post('/login', {
        mobile: data.mobile,
        password: data.password,
    })
}