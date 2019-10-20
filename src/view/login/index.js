import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import Model from '../../model'
import './style.scss'
class NormalLoginForm extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Model.login(values)
          .then(({data}) => {
            if(data.status === 200) {
              sessionStorage.setItem('isLogin','1')
              window.location.href='/view/dashboard'
            }
          })
      }
    });
  };
  onInputKeyUp(e){
    if(e.keyCode === 13){
        this.handleSubmit();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              onKeyUp={e => this.onInputKeyUp(e)}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              onKeyUp={e => this.onInputKeyUp(e)}
            />,
          )}
        </Form.Item>
          <Button type="primary" onClick={() => this.handleSubmit()}  className="login-form-button">
            登录
          </Button>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
function Login () {
    return (
        <div className="login-page">
           <div className="login-panel">
             <WrappedNormalLoginForm/>
           </div>
        </div>
    )
}
export default Login