import React,{ useState } from 'react'
import { Modal, Button, Form, Input} from 'antd';
import PicturesWall from '../../components/PicturesWall'
const { TextArea } = Input
MerchantAuth.defaultProps = {
  info: {}
}
function MerchantAuth(props) {
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }
    return (
        <div class="merchant-info">
            <div style={{flex:1}}>
            <div className="space-between">
                    <div className="title">公司名称</div>
                    <Button type="danger" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small">编辑</Button>
                </div>
                <div className="desc">{props.info.companyName}</div>
                <div className="title">公司税号</div>
                <div className="desc">{props.info.companyIdNumber}</div>
                <div className="title">公司预留联系方式</div>
                <div className="desc">{props.info.companyContact}</div>
                <div className="title">公司营业执照</div>
                <img class="img-single" src={props.info.companyLicenseIcon}/>
                <div className="title">公司营开户许可照片</div>
                <img class="img-single" src={props.info.companyPermitIcon}/>
            </div>
            <div className="btngroup">
                <div >通过</div>
                <div >不通过</div>
            </div>
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
            title="商家认证"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="公司名称">
                  {getFieldDecorator(`companyName`, {
                    rules: [{ required: true, message: '请填写公司名称' }],
                    initialValue: info.companyName || ''
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="公司税号">
                  {getFieldDecorator(`companyIdNumber`, {
                    rules: [{ required: true, message: '请填写公司税号' }],
                    initialValue: info.companyIdNumber || ''
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="公司联系方式">
                  {getFieldDecorator(`companyContact`, {
                    rules: [{ required: true, message: '公司联系方式' }],
                    initialValue: info.companyContact || ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="公司营业执照">
                  {getFieldDecorator('shopImages', {
                    rules: [{ required: true, message: '请上传店铺照片' }],
                    valuePropName: 'companyLicenseIcon',
                    getValueFromEvent: info.companyLicenseIcon || []
                  })(
                    <PicturesWall data={{type: '5'}}/>
                  )}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default MerchantAuth