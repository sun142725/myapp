import http from '@/config/http'

//  发起好友请求
export function requestFriend(data){
    return http.post('/requestFriend',{
        mobile: data.mobile,
        friend_mobile: data.friend_mobile,
    })
}