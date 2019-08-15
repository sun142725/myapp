import http from '@/config/http'

//  发起好友请求
export function requestFriend(data){
    return http.post('/requestFriend',{
        mobile: data.mobile,
        friend_mobile: data.friend_mobile,
    })
}
//  接受好友请求
export function acceptFriend(data){
    return http.post('/acceptFriend',{
        room_id: data.room_id,
    })
}
//  获取我的好友列表
export function getMyFriend(data){
    return http.post('/getMyFriend',{
        mobile: data.mobile,
    })
}
//  删除我的好友
export function deleteFriend(data){
    return http.post('/deleteFriend',{
        room_id: data.room_id,
    })
}
//  加入群聊
export function joinRoom(data){
    return http.post('/joinRoom',{
        room_id: data.room_id || '',
        mobile: data.mobile,
        type: data.type || 0
    })
}