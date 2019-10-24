import React,{useState, useEffect} from 'react'
import { Modal, Button, Form, Input, Icon } from 'antd'
import Model from '../../model'
function VoucherEdit () {
    const [visible,setVisible] = useState(false)
    const [confirmLoading,setLoading] = useState(false)
    const [voucherList,setVoucherList] = useState([])
    const [activeVoucher,setActiveVoucher] = useState(null)
    const [formRef,saveFormRef] = useState()
    useEffect(() => {
      getVoucher()
    },[])
    const getVoucher = () => {
      Model.getVoucherList()
      .then(({data}) => {
        if(data.status === 200) {
          setVoucherList(data.data)
        }
      })
    }
    const edit = item => {
      setActiveVoucher(item)
      setVisible(true)
    }
    // 删除
    const remove = id => {
      Model.deleteVoucher(id)
      .then(({data}) => {
        if(data.status === 200) {
          getVoucher()
        }
      }) 
    }
    // 增加
    const add = () => {
      setActiveVoucher(null)
      setVisible(true)
    }
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
          console.log(activeVoucher)
            if(activeVoucher) {
              // 编辑
              let data = Object.assign(activeVoucher,values)
              Model.updateVoucher(data)
                .then(({data}) => {
                  if(data.status === 200) {
                    setVisible(false)
                    getVoucher()
                  }
                }) 
            } else {
              // 增加
              Model.addVoucher(values)
              .then(({data}) => {
                if(data.status === 200) {
                  setVisible(false)
                  getVoucher()
                }
              }) 
            }
        })
    }
    const renderItem = (item,index) => {
           return (
            <div key={index} className="voucher-item topBar">
            <div>
              <div className="title">{item.title}</div>
            </div>
            <div className="count">
               {item.rate}%
            </div>
            <div className="action">
              <Icon onClick={() => edit(item)} type="edit" />
              <Icon type="close" onClick={() => remove(item.id)}/>
            </div>
           </div>
          )
        }
    return (
        <div className="voucher-edit">
            <div className="topBar">
              <div className="title">代金劵</div>
              <Button type="danger" onClick={add} shape="round" className="btn-edit" size="small">新增</Button>
            </div>
            <div className="voucherList scrollbar">
              {voucherList.map((item,index) => renderItem(item,index) )}
            </div>
            <CollectionCreateForm
            wrappedComponentRef={saveFormRef}
            visible={visible}
            onCancel={setVisible}
            handleOk={handleOk}
            voucher={activeVoucher}
            />
        </div>
    )

}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const { visible, handleOk, onCancel, form, voucher} = this.props
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
                <Form.Item label="名称">
                  {getFieldDecorator(`title`, {
                    rules: [{ required: true, message: '代金券名称不能为空' }],
                    initialValue: voucher ? voucher.title : ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="抽中比例">
                {getFieldDecorator(`rate`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.rate : ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="满多少金额">
                {getFieldDecorator(`withAmount`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.withAmount : ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="减多少金额">
                {getFieldDecorator(`usedAmount`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.usedAmount : ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="自领取之日起有效天数">
                {getFieldDecorator(`validDays`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.validDays : ''
                  })(<Input />)}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default VoucherEdit