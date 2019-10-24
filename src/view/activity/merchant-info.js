import React,{ useState } from 'react'
import { Modal, Button, Form, Input} from 'antd';
import PicturesWall from '../../components/PicturesWall'
const { TextArea } = Input
MerchantInfo.defaultProps = {
  info: {}
}
function MerchantInfo(props) {
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }
    return (
        <div className="merchant-info">
            <div style={{flex:1}}>
                <div className="space-between">
                    <div className="title">店铺名称</div>
                    <Button type="primary" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small">新增</Button>
                </div>
                <div className="desc">{props.info.shopName}</div>
                <div className="title">店铺地址</div>
                <div className="desc">{props.info.shopAddress}</div>
                <div className="title">店铺联系方式</div>
                <div className="desc">{props.info.shopContact}</div>
                <div className="title">店铺营业时间</div>
                <div className="desc">{props.info.shopHours}</div>
                <div className="title">店铺描述</div>
                <div className="desc">{props.info.shopDesc}</div>
                <div className="title">店铺照片</div>
                <div className="img-wrap">
                  {
                    props.info.shopImages ? JSON.parse(props.info.shopImages).map((v,index) => (
                       <img key={index} src={v}/>
                    )) : null
                  }
                </div>
            </div>
            <div className="btn">挂起</div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            info={props.info}
            />
        </div>
    )
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
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
            title="商家信息编辑"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="店铺名称">
                  {getFieldDecorator(`shopName`, {
                    rules: [{ required: true, message: '请填写店铺名称' }],
                    initialValue: info.shopName || ''
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="店铺地址">
                  {getFieldDecorator(`shopAddress`, {
                    rules: [{ required: true, message: '请填写店铺地址' }],
                    initialValue: info.shopAddress || ''
                  })(<TextArea autosize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
                <Form.Item label="店铺联系方式">
                  {getFieldDecorator(`shopContact`, {
                    rules: [{ required: true, message: '请填写店铺联系' }],
                    initialValue: info.shopContact || ''
                  })(<TextArea autosize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item> 
                <Form.Item label="店铺营业时间">
                  {getFieldDecorator(`shopHours`, {
                    rules: [{ required: true, message: '请填写店铺营业时间' }],
                    initialValue: info.shopHours || ''
                  })(<Input/>)}
                </Form.Item> 
                <Form.Item label="店铺描述">
                  {getFieldDecorator(`shopDesc`, {
                    rules: [{ required: true, message: '请填写店铺描述' }],
                    initialValue: info.shopDesc || ''
                  })(<TextArea autosize={{ minRows: 3, maxRows: 5 }}/>)}
                </Form.Item>
                <Form.Item label="店铺照片">
                  {getFieldDecorator('shopImages', {
                    rules: [{ required: true, message: '请上传店铺照片' }],
                    getValueFromEvent: this.normFile,
                  })(
                    <PicturesWall fileList={info.shopImages && JSON.parse(info.shopImages).map((v,index) => {
                      let item = {}
                      item.uid = '-' + index
                      item.url = v
                      return item
                    }) || []} data={{type: '5'}}/>
                  )}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default MerchantInfo