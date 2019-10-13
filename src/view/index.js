import React,{ useState } from 'react';
import './index.scss'
import { Layout, Menu, Icon } from 'antd';
import { Link, Route } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
const { Header, Sider, Content } = Layout
function View({ match }) {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <Layout className="page">
        <Sider trigger={null} collapsible collapsedWidth={75} collapsed={collapsed}>
          <Menu theme="dark" style={{paddingTop: '84px'}} mode="inline" defaultSelectedKeys={[match.params.page]}>
            <Menu.Item key="dashboard">
            <Link to="/view/dashboard">  
              <Icon type="dashboard" />
                <span>主页</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', paddingLeft: '10px', height: '56px' }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Content>
            <Route path="/view/dashboard" component={Dashboard}/>
          </Content>
        </Layout>
      </Layout>
    )
}
export default View