import React, {Component} from 'react';
import { Alert} from 'antd'
class Popup extends Component{
    componentDidMount() {
        setTimeout(() => {
            this.props.updatePop()
        }, 2000);
    }
    render() {
        return (
            <Alert message={this.props.con.message} type={this.props.con.type} showIcon style={{maxWidth:'500px','margin':'0 auto'}} />
        )
    }
}
export default Popup