import React,{ useState } from 'react';
import './index.scss'
import { Layout, Menu, Icon } from 'antd';
import { Link, Route } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import ActivityDetails from './activity/Details'
import ActivityEdit from './activity/activity-edit'
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
            <Menu.Item key="activityDetails">
            <Link to="/view/activityDetails">  
              <Icon type="table" />
              <span>活动详情</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="activityInfo">
            <Link to="/view/activityInfo"> 
              <Icon type="edit" />
              <span>活动编辑</span>
              </Link>
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
            <Route path="/view/activityDetails" component={ActivityDetails}/>
            <Route path="/view/activityInfo" component={ActivityEdit}/>
          </Content>
        </Layout>
      </Layout>
    )
}
export default View