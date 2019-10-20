import React,{ useState } from 'react'
import { Modal, Button, Form, Input, DatePicker} from 'antd';
import PicturesWall from '../../components/PicturesWall'
const { TextArea } = Input
function ActivityInfo() {
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const [info,setInfo] = useState({})
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }
    return (
        <div className="aside-panel">
            <div style={{flex:1}}>
                <div className="main-title">
                    <span>活动详情</span>
                    <span></span>
                </div>
                <div className="space-between">
                    <div className="title">活动名称</div>
                    <Button type="danger" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small">编辑</Button>
                </div>
                <div className="title">活动开始日期</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">活动开始日期</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">活动主办方联系方式</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">活动内容描述</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">活动照片</div>
                <PicturesWall/>
            </div>
            <div className="btn">挂起</div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            info={info}
            />
        </div>
    )
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      
      render() {
        const { visible, handleOk, onCancel, form, info} = this.props
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
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="活动名称">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请填写活动名称' }],
                    initialValue: info.name
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="活动开始日期">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请选择活动开始日期' }],
                    initialValue: info.name
                  })(<DatePicker/>)}
                </Form.Item> 
                <Form.Item label="活动结束日期">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请选择活动结束日期' }],
                    initialValue: info.name
                  })(<DatePicker />)}
                </Form.Item> 
                <Form.Item label="活动主办方联系方式">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请填写活动主办方联系方式' }],
                    initialValue: info.name
                  })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
                <Form.Item label="活动内容描述">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请填写活动内容描述' }],
                    initialValue: info.name
                  })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
            </Form>
          </Modal>
        );
      }
    },
  );
export default ActivityInfo