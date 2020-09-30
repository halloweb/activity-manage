import React,{ useState } from 'react'
import { Modal, Button, Form, Input, message} from 'antd';
import PicturesWall from '../../../components/PicturesWall'
import Model from '../../../model'
MerchantAuth.defaultProps = {
  info: {}
}
function MerchantAuth(props) {
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
          console.log(err)
          !err && Model.certification({userid:props.info.userid,...values})
            .then(({data}) => {
              if(data.status === 200) {
                setVisible(false)
                props.pageChange()
              }  else {
                message.error(data.msg)
              }
            })
        })
    }
    const hang = (flag) => {
      if(props.info.companyStatus === flag) return
      Model.merchantAudit({userid:props.info.userid,status:flag})
        .then(({data}) => {
          if(data.status === 200) {
            props.pageChange()
          } else {
            message.error(data.msg)
          }
        })
    }
    return (
        <div className="merchant-info">
            <div style={{flex:1}}>
            <div className="space-between">
                    <div className="title">公司名称</div>
                    <Button type="danger" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small" disabled={props.info.companyStatus === 2}>编辑</Button>
                </div>
                <div className="desc">{props.info.companyName}</div>
                <div className="title">公司税号</div>
                <div className="desc">{props.info.companyIdNumber}</div>
                <div className="title">公司预留联系方式</div>
                <div className="desc">{props.info.companyContact}</div>
                <div className="title">公司营业执照</div>
                <img className="img-single" src={props.info.companyLicenseIcon}/>
                <div className="title">公司营开户许可照片</div>
                <img className="img-single" src={props.info.companyPermitIcon}/>
            </div>
            <div className="btngroup">
                <div className={`${props.info.companyStatus === 2 ? 'disabled' : null}`} onClick={() => hang(2)}>通过</div>
                <div className={`${props.info.companyStatus === 1 ? 'disabled' : null}`} onClick={() => hang(1)}>不通过</div>
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
      state = {
        imgList0: [],
        imgList1: [],
        change0: false,
        change1: false
      }

      normFile = (e,flag) => {
        return e.file.url || (e.file.response && e.file.response.data) || ''
      };
      pictureChange = ({file,fileList},flag) => {
        this.setState({[`imgList${flag}`]: [...fileList]})
      }
      remove = (file,flag) => {
        this.setState({[`imgList${flag}`]: []})
        this.setState({[`change${flag}`]: true})
        const {setFieldsValue} = this.props.form
        let item = flag === 0 ? {companyLicenseIcon:''} : {companyPermitIcon:''}
        setFieldsValue(item)
      }
      UNSAFE_componentWillReceiveProps(props) { // 父组件重传props时就会调用这个方法
        if (props.info.companyLicenseIcon && this.state.imgList0.length === 0 && !this.state.change0) {
          const {setFieldsValue} = this.props.form
          setFieldsValue({companyLicenseIcon:props.info.companyLicenseIcon})
          this.setState({imgList0: [{url:props.info.companyLicenseIcon,uid:'-2'}]})
          console.log(this.state.imgList0)
        } 
        if (props.info.companyPermitIcon && this.state.imgList1.length === 0 && !this.state.change1) {
          const {setFieldsValue} = this.props.form
          setFieldsValue({companyPermitIcon:props.info.companyPermitIcon})               
          this.setState({imgList1: [{url:props.info.companyLicenseIcon,uid:'-1'}]})
        } 
      }
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
                  {getFieldDecorator('companyLicenseIcon', {
                      rules: [{ required: true, message: '请上传公司营业执照' }],
                      getValueFromEvent: (e) => this.normFile(e,0),
                    })(
                      <PicturesWall                   
                      onRemove={(e) => this.remove(e,0)}
                      onChange={(e) => this.pictureChange(e,0)}
                      fileList={this.state.imgList0}
                      maxCount={1}
                      data={{type: '6'}}/>
                    )}
                </Form.Item>
                <Form.Item label="营开户许可照片">
                  {getFieldDecorator('companyPermitIcon', {
                      rules: [{ required: true, message: '请上传公司营开户许可照片' }],
                      getValueFromEvent: (e) => this.normFile(e,1),
                    })(
                      <PicturesWall                   
                      onRemove={(e) => this.remove(e,1)}
                      onChange={(e) => this.pictureChange(e,1)}
                      fileList={this.state.imgList1}
                      maxCount={1}
                      data={{type: '7'}}/>
                    )}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default MerchantAuth