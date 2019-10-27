import React,{ useState } from 'react'
import { Modal, Button, Form, Input} from 'antd';
import Model from '../../model'
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
          console.log(err)
          !err && Model.merchantEdit({userid:props.info.userid,...values})
            .then(({data}) => {
              if(data.status === 200) {
                setVisible(false)
                props.pageChange()
              }
            })
        })
    }
    const hang = () => {
      if(props.info.userStatus === 2) return
      Model.setBusinessUserState(props.info.userid)
        .then(({data}) => {
          if(data.status === 200) {
            props.pageChange()
          }
        })
    }
    return (
        <div className="merchant-info">
            <div style={{flex:1}}>
                <div className="space-between">
                    <div className="title">店铺名称</div>
                    <Button type="danger" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small">编辑</Button>
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
            <div className={`btn ${props.info.userStatus === 2 ? 'disabled' : null}`} onClick={hang}>挂起</div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            key={props.info.id}
            info={props.info}
            />
        </div>
    )
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      state = {
        imgList: []
      }

      normFile = e => {
        let result = e.fileList.reduce((t,v) => {
          v.url && t.push(v.url)
          v.response && t.push(v.response.data)
          return t
        },[])
        return JSON.stringify(result)
      };
      pictureChange = ({file,fileList}) => {
        this.setState({imgList: [...fileList]})
      }
      remove = (file) => {
        let laveFile = this.state.imgList.filter(v => v.uid !== file.uid)
        this.setState({imgList: [...laveFile]})
        let result = laveFile.reduce((t,v) => {
          v.url && t.push(v.url)
          v.response && t.push(v.response.data)
          return t
        },[])
        const {setFieldsValue} = this.props.form
        setFieldsValue({shopImage:JSON.stringify(result)})
      }
      componentDidMount(){ // 父组件重传props时就会调用这个方法
        console.log(this.props.info.shopImages)
        if (this.props.info.shopImages) {
          let result = JSON.parse(this.props.info.shopImages).map((v,index) => {
                      let item = {}
                      item.uid = '-' + index
                      item.url = v
                      return item
                    })
          const {setFieldsValue} = this.props.form
          setFieldsValue({shopImage:this.props.info.shopImages})                
          this.setState({imgList: result})
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
                  {getFieldDecorator('shopImage', {
                    rules: [{ required: true, message: '请上传店铺照片' }],
                    getValueFromEvent: this.normFile,
                  })(
                    <PicturesWall                   
                    onRemove={this.remove}
                    onChange={this.pictureChange}
                    fileList={this.state.imgList}
                    data={{type: '5'}}/>
                  )}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default MerchantInfo