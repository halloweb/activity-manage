import React,{useState, useEffect} from 'react'
import { Modal, Form, Input, Icon, InputNumber } from 'antd'
import Model from '../../model'
function RechargeProduct () {
    const [visible,setVisible] = useState(false)
    const [voucherList,setVoucherList] = useState([])
    const [activeVoucher,setActiveVoucher] = useState(null)
    const [formRef,saveFormRef] = useState()
    useEffect(() => {
      getVoucher()
    },[])
    const getVoucher = () => {
      Model.selectTopUpWithCount()
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
      Model.updateTopUpWithCount({id:id,status: 0})
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
              Model.updateTopUpWithCount(data)
                .then(({data}) => {
                  if(data.status === 200) {
                    setVisible(false)
                    getVoucher()
                  }
                }) 
            } else {
              // 增加
              Model.insertTopUpWithCount(values)
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
              <div className="subTitle">现价:{item.price} 原价:{item.originalPrice} {item.ticketNum}张</div>
            </div>
            <div className="count status">
               <div>已售:{item.buyCount}张</div>
               {item.status === 1 ? <span>生效中</span> : <span className="disabled">已停用</span>}
            </div>
            <div className="action">
              <Icon onClick={() => edit(item)} type="edit" />
              <Icon type="close" onClick={() => remove(item.id)}/>
              <Icon type="plus" onClick={add}/>
            </div>
           </div>
          )
        }
    return (
        <div className="voucher-edit">
            {/* <div className="topBar">
              <div className="title">代金劵</div>
              <Button type="danger" onClick={add} shape="round" className="btn-edit" size="small">新增</Button>
            </div> */}
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
            title="充值卡编辑"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="名称">
                  {getFieldDecorator(`title`, {
                    rules: [{ required: true, message: '充值卡名称不能为空' }],
                    initialValue: voucher ? voucher.title : ''
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="现价">
                {getFieldDecorator(`price`, {
                    rules: [{ required: true, message: '现价不能为空' }],
                    initialValue: voucher ? voucher.price : 0
                  })(<InputNumber min={0} />)}
                </Form.Item>
                <Form.Item label="原价">
                {getFieldDecorator(`originalPrice`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.originalPrice : 0
                  })(<InputNumber  min={0} />)}
                </Form.Item>
                <Form.Item label="票数">
                {getFieldDecorator(`ticketNum`, {
                    rules: [{ required: true, message: '中奖比例不能为空' }],
                    initialValue: voucher ? voucher.ticketNum : 0
                  })(<InputNumber min={0} />)}
                </Form.Item>
                <Form.Item label="状态">
                {getFieldDecorator(`status`, {
                    rules: [{ required: true, message: '状态' }],
                    initialValue: voucher ? voucher.status : 1
                  })(<InputNumber  min={0} max={1} step={1}/>)}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default RechargeProduct