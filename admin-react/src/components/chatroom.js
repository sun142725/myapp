import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import io from 'socket.io-client';
const socket = io.connect('http://192.168.1.177:18080')
const { Header, Footer, Sider, Content} = Layout;



function ChatUl(arr){
    let chatarr = arr.chatarr
    const listItems = chatarr.map((v, i) =><li key={i}>{v.content}</li>)
    return (
        <ul>{listItems}</ul>
    )
}
class ChatRoom extends Component{
    constructor(){
        super()
        this.state = {
            chatarr: [],
            userList: [7,8,9]
        }
        this.send = this.send.bind(this)
    }
    componentDidMount(){
        let that =this
        console.log(window.ajax)
        socket.emit('group1')
        socket.on('news', function (data) {
            console.log(data)
            var arrs = that.state.chatarr
            arrs.push(data.hello)
            that.setState({chatarr: arrs})
        })
    }
    send(){
        let value = this.refs.input.value
        var arr = this.state.chatarr
        arr.push({content: value})
        this.setState({chatarr: arr})
        console.log(this.state)
        socket.emit('content', {content: value})
    }
    render(){
        return (
            <Layout style={{background: '#fff',width:'800px',margin: '30px auto',height:'600px',boxShadow: '0 0 5px rgba(0,0,0,0.3)'}}>
                <Layout>
                    <Header style={{backgroundColor:'#fff',borderBottom:'1px solid rgba(0,0,0,0.3)',height: '50px'}}>聊天群</Header>
                    <Content style={{background: '#fff',borderBottom: '1px solid rgba(0,0,0,0.3)',padding: '0'}}><ChatUl chatarr={this.state.chatarr}/></Content>
                    <Footer style={{height: '200px'}}>
                        <textarea name="" id="" style={{width: '100%',height: 'calc(100% - 30px)', overflowY:'auto',resize: 'none'}} ref='input'></textarea>
                        <Button onClick={this.send}>发送</Button>
                    </Footer>
                </Layout>
                <Sider style={{background:'#fff',borderLeft: '1px solid rgba(0,0,0,0.3)'}}><ChatUl chatarr={this.state.userList}/></Sider>
            </Layout>
        )
    }
}
export default ChatRoom