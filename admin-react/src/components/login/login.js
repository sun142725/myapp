import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd'
import Popup from '../common/popup'
import './login.css'
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(){
        super()
        this.state ={
            redirect: false,
            pop: false,
            popCon: {}
        }
    }
    componentWillMount(){
        console.log(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                window.ajax.login(values)
                    .then(res=>res.data)
                    .then(res=>{
                        console.log(res)
                        if(res.code === 1){
                            window.fakeAuth.isAuthenticated = true
                            that.setState({pop: true})
                            that.setState({popCon: {
                                message: res.msg,
                                type: 'success'
                            }})
                            that.setState({redirect: true})
                        } else {
                            that.setState({pop: true})
                            that.setState({popCon: {
                                message: res.msg,
                                type: 'error'
                            }})
                        }
                    })
            }
        });
    }
    updatePop = () => {
        this.setState({pop: false})
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        if (this.state.redirect){
            return <Redirect to={{
                pathname: '/'
            }}/>
        }
        return (
            <div style={{width:'100%',height:'100%',background: 'rgba(0,0,0,0.1)'}}>
                {this.state.pop ? <Popup con={this.state.popCon} updatePop={this.updatePop}/> : null}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h6 style={{fontSize: '24px'}}>管理员登录入口</h6>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm

