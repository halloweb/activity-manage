import React, { useState } from 'react'
import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import PicturesWall from '../../components/PicturesWall'
import moment from 'moment'
import Model from '../../model'
const { TextArea } = Input
function ActivityInfo(props) {
  const [visible, setVisible] = useState(false)
  const [formRef, saveFormRef] = useState()
  const [confirmLoading, setLoading] = useState(false)
  const [editContent, setEditContent] = useState(false)
  const handleOk = () => {
    const { form } = formRef.props
    setLoading(true)
    form.validateFields((err, values) => {
      if (err) return
      values.startTime = values.startTime.format("YYYY-MM-DD HH:mm:ss")
      values.endTime = values.endTime.format("YYYY-MM-DD HH:mm:ss")
      setLoading(true)
      if (Object.keys(editContent).length) {
        let data = Object.assign(props.info, values)
        Model.updateActivity(data)
          .then(({ data }) => {
            if (data.status === 200) {
              setVisible(false)
              message.success('修改成功')
              props.update && props.update()
            } else {
              message.error('修改失败')
            }
          })
          .catch(() => message.error('修改失败'))
          .finally(() => setLoading(false))
      } else {
        Model.addActivity({ bigActivityId: props.info.bigActivityId || props.categoryId, ...values })
          .then(({ data }) => {
            if (data.status === 200) {
              setVisible(false)
              message.success('添加成功')
              props.update && props.update()
            } else {
              message.error('添加失败')
            }
          })
          .catch(() => message.error('添加失败'))
          .finally(() => setLoading(false))
      }
    })
  }
  const suspend = () => {
    props.info.activityStatus !== 0 
    && Model.suspendActivity(props.info.id).then(({data}) => {
      if(data.status === 200) {
         message.success('活动挂起成功')
         props.update && props.update()
      } else {
         message.error('活动挂起失败') 
      }
      })
      .catch(() => message.error('活动挂起失败'))   
  }
  const edit = () => {
    setEditContent(props.info)
    setVisible(true)
  }
  const add = () => {
    setEditContent({})
    setVisible(true)
  }
  return  (<div className="aside-panel edit-info">
    <div style={{ flex: 1 }}>
      <div className="main-title">
        <span>活动详情</span>
        <span>
          {Object.keys(props.info).length ? <Button type="danger" onClick={edit} shape="round" size="small">编辑</Button>: null}
          <Button type="primary" onClick={add} shape="round" size="small">新增</Button>
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
      <div className="img-wrap">
        <img src={props.info.activityIcon} />
      </div>
    </div>
    {Object.keys(props.info).length ? <div className={`btn ${props.info.activityStatus === 0 ? 'disabled' : null}`} onClick={suspend}>挂起</div> :null}
    <CollectionCreateForm
      wrappedComponentRef={saveFormRef}
      visible={visible}
      onCancel={setVisible}
      handleOk={handleOk}
      key={editContent.id || '-1'}
      confirmLoading={confirmLoading}
      info={editContent}
    />
  </div>)
}
ActivityInfo.defaultProps = {
  info: {}
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    state = {
      imgList: this.props.info.activityIcon ? [{ url: this.props.info.activityIcon, uid: '-1' }] : []
    }

    normFile = e => {
      return e.file.url || (e.file.response && e.file.response.data) || ''
    };
    pictureChange = ({ file, fileList }) => {
      this.setState({ imgList: [...fileList] })
    }
    remove = (file) => {
      this.setState({ imgList: [] })
      const { setFieldsValue } = this.props.form
      setFieldsValue({ activityIcon: '' })
    }
    UNSAFE_componentWillReceiveProps(props) { // 父组件重传props时就会调用这个方法
      if (props.info.activityIcon && props.info.activityIcon !== this.props.info.activityIcon) {
        this.setState({ imgList: [{ url: props.info.activityIcon, uid: '-1' }] })
      }
      const { setFieldsValue, getFieldValue, resetFields } = this.props.form
      if (props.info.activityIcon && !getFieldValue('activityIcon')) {
        setFieldsValue({ activityIcon: props.info.activityIcon })
      }
    }
    render() {
      const { visible, handleOk, onCancel, form, info } = this.props
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
          bodyStyle={{ maxHeight: '400px', overflow: 'auto' }}
          title="活动信息编辑"
          cancelText="取消"
          okText="确定"
          onCancel={() => onCancel(false)}
          onOk={handleOk}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="活动名称">
              {getFieldDecorator(`activityName`, {
                rules: [{ required: true, message: '活动名称' }],
                initialValue: info.activityName || ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="活动开始日期">
              { 
                  getFieldDecorator(`startTime`, { rules: [{required: true, message: '请选择活动开始日期' }],
                  initialValue: (info.startTime && moment(info.startTime, "YYYY-MM-DD HH:mm:ss")) || null,
                  getValueFromEvent: (date) => date
                  })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)
              }
              </Form.Item>
            <Form.Item label="活动结束日期">
              {getFieldDecorator(`endTime`, {
                rules: [{ required: true, message: '请选择活动结束日期' }],
                initialValue: (info.endTime && moment(info.endTime, "YYYY-MM-DD HH:mm:ss")) || null,
                  getValueFromEvent: (date) => date,
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </Form.Item>
            <Form.Item label="主办方联系方式">
              {getFieldDecorator(`contact`, {
                rules: [{ required: true, message: '请填写主办方联系方式' }],
                initialValue: info.contact || ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="活动描述">
              {getFieldDecorator(`activityDesc`, {
                rules: [{ required: true, message: '请填写活动描述"' }],
                initialValue: info.activityDesc || ''
              })(<TextArea autosize={{ minRows: 3, maxRows: 5 }} />)}
            </Form.Item>
            <Form.Item label="活动照片">
              {getFieldDecorator('activityIcon', {
                rules: [{ required: true, message: '请上传活动照片' }],
                getValueFromEvent: this.normFile,
              })(
                <PicturesWall
                  onRemove={this.remove}
                  onChange={this.pictureChange}
                  fileList={this.state.imgList}
                  maxCount={1}
                  data={{ type: '4' }} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
export default ActivityInfo