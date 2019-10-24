import React,{ useState } from 'react'
import { Modal, Button, Form, Input, DatePicker, message} from 'antd';
import PicturesWall from '../../components/PicturesWall'
import Model from '../../model'
const { TextArea } = Input
function ActivityInfo(props) {
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const [confirmLoading,setLoading] = useState(false)
    const handleOk = () => {
        const { form } = formRef.props
        setLoading(true)
        form.validateFields((err, values) => {
            let data = Object.assign(props.info,values)
            Model.updateActivity(data)
              .then(({data}) => {
                  if(data.status === 200) {
                    setVisible(false)
                    message.success('修改成功')
                  } else {
                    message.error('修改失败')
                  }
              })
              .catch(() => message.error('修改失败'))
              .finally(() => setLoading(false))
        })
    }
    const suspend = () => {
      Model.suspendActivity(props.info.activityId)
    }
    return (
        <div className="aside-panel edit-info">
            <div style={{flex:1}}>
                <div className="main-title">
                    <span>活动详情</span>
                    <span>
                      <Button type="danger" onClick={() => setVisible(true)} shape="round"  size="small">编辑</Button>
                      <Button type="primary" onClick={() => setVisible(true)} shape="round" size="small">新增</Button>
                    </span>
                </div>
                <div className="space-between">
                    <div className="title">活动名称</div>
                </div>
                <div className="desc">{props.info.activityName}</div>
                <div className="title">活动开始日期</div>
                <div className="desc">{props.info.startTime}</div>
                <div className="title">活动结束日期</div>
                <div className="desc">{props.info.endTime}</div>
                <div className="title">活动主办方联系方式</div>
                <div className="desc">{props.info.contact}</div>
                <div className="title">活动内容描述</div>
                <div className="desc">{props.info.activityDesc}</div>
                <div className="title">活动照片</div>
                <PicturesWall/>
            </div>
            <div className="btn" onClick={suspend}>挂起</div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            confirmLoading={confirmLoading}
            info={props.info}
            />
        </div>
    )
}
ActivityInfo.defaultProps= {
  info: {}
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      
      render() {
        const { visible, handleOk, onCancel, form, info, confirmLoading} = this.props
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
          <Modal
            visible={visible}
            bodyStyle={{maxHeight: '400px',overflow: 'auto'}}
            title="活动信息编辑"
            cancelText="取消"
            okText="确定"
            confirmLoading={confirmLoading}
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="活动名称">
                  {getFieldDecorator(`activityName`, {
                    rules: [{ required: true, message: '请填写活动名称' }],
                    initialValue: info.activityName
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="活动开始日期">
                  {getFieldDecorator(`startTime`, {
                    rules: [{ required: true, message: '请选择活动开始日期' }],
                    initialValue: info.startTime
                  })(<DatePicker/>)}
                </Form.Item> 
                <Form.Item label="活动结束日期">
                  {getFieldDecorator(`endTime`, {
                    rules: [{ required: true, message: '请选择活动结束日期' }],
                    initialValue: info.endTime
                  })(<DatePicker />)}
                </Form.Item> 
                <Form.Item label="活动主办方联系方式">
                  {getFieldDecorator(`contact`, {
                    rules: [{ required: true, message: '请填写活动主办方联系方式' }],
                    initialValue: info.contact
                  })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
                <Form.Item label="活动内容描述">
                  {getFieldDecorator(`activityDesc`, {
                    rules: [{ required: true, message: '请填写活动内容描述' }],
                    initialValue: info.activityDesc
                  })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
            </Form>
          </Modal>
        );
      }
    },
  );
export default ActivityInfo