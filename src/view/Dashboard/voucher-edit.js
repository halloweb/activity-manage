import React,{useState} from 'react'
import { Modal, Button, Form, Input, Row, Col } from 'antd';
function VoucherEdit () {
    const [visible,setVisible] = useState(false)
    const [confirmLoading,setLoading] = useState(false)
    const [voucherList,setVoucherList] = useState([])
    const [formRef,saveFormRef] = useState()
    const handleOk = () => {
        const { form } = formRef.props
        console.log(form)
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }
    const renderItem = (item) => {
           return (
            <div className="voucher-item topBar">
            <div>
              <div className="title">name</div>
            </div>
            <div className="count">
               50%
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
            <div className="voucherList">
              {voucherList.map(item => renderItem(item) )}
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
        const { visible, handleOk, onCancel, form, voucherList} = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="代金券编辑"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form layout="vertical">
          { voucherList.map(item => {

            return (<Row>
              <Col span={12}>
                <Form.Item label="Title">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '代金券名称不能为空' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Description">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
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