import React,{useState} from 'react'
import { Modal, Button, Form, Input, Row, Col } from 'antd';
function VoucherEdit () {
    const [visible,setVisible] = useState(false)
    const [confirmLoading,setLoading] = useState(false)
    const [voucherList,setVoucherList] = useState([{name:'aaa',count: '13%'},{name:'aaa',count: '13%'},{name:'aaa',count: '13%'}])
    const [formRef,saveFormRef] = useState()
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }
    const renderItem = (item,index) => {
           return (
            <div key={index} className="voucher-item topBar">
            <div>
              <div className="title">{item.name}</div>
            </div>
            <div className="count">
               {item.count}
            </div>
           </div>
          )
        }
    return (
        <div className="voucher-edit">
            <div className="topBar">
              <div className="title">代金劵</div>
              <Button type="danger" onClick={() => setVisible(true)} shape="round" className="btn-edit" size="small">编辑</Button>
            </div>
            <div className="voucherList scrollbar">
              {voucherList.map((item,index) => renderItem(item,index) )}
            </div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            voucherList={voucherList}
            />
        </div>
    )

}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      
      render() {
        const { visible, handleOk, onCancel, form, voucherList} = this.props
        const { getFieldDecorator } = form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
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
            title="代金券编辑"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
          { voucherList.map((item,index) => {

            return (<Row gutter={24} key={index}>
              <Col span={12}>
                <Form.Item label="名称">
                  {getFieldDecorator(`voucherList[${index}].name`, {
                    rules: [{ required: true, message: '代金券名称不能为空' }],
                    initialValue: item.name
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="抽中比例">
                {getFieldDecorator(`voucherList[${index}].count`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: item.count
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            )            
          })
          }  
            </Form>
          </Modal>
        );
      }
    },
  );
export default VoucherEdit