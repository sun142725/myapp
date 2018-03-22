import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Chat from './chatroom'
import { Layout, Row, Col, Avatar } from 'antd';
const { Header, Footer} = Layout;

const About = () => (
    <div>
        <h2>关于</h2>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>主题列表</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    使用 React 渲染
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    组件
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    属性 v. 状态
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>请选择一个主题。</h3>
        )}/>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
class Home extends Component {
    componentWillMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div className="App">
                <Layout style={{background: '#fff'}}>
                    <Header>
                        <Row>
                            <Col icon="user"><Avatar size="large" icon="user" />02160556924</Col>
                            <Col></Col>
                            <Col/>
                            <Col/>
                        </Row>
                    </Header>
                    <Router>
                        <div>
                            <Row>
                            <Col icon="user" span={6}><Avatar size="large" icon="user" />02160556924</Col>
                            <Col span={3} offset={9}><Link to="/">首页</Link></Col>
                            <Col span={3}><Link to="/about">关于我们</Link></Col>
                            <Col span={3}><Link to="/topics">主题列表</Link></Col>
                            </Row>
                            <Route exact path="/" component={Chat}/>
                            <Route path="/about" component={About}/>
                            <Route path="/topics" component={Topics}/>
                        </div>
                    </Router>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        );
    }
}
export default Home