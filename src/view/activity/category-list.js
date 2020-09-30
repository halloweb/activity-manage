import React,{ useState, useEffect } from 'react'
import './category.scss'
import { Input, Form , Icon, Modal, Radio, Select } from 'antd'
import PicturesWall from '../../components/PicturesWall'
import Model from '../../model'
const { Option } = Select
function CategoryList (props) {
    const [categoryList,setCategory] = useState([])
    const [activeIndex,setActiveIndex] = useState(0)
    const [activeSecond,setActiveSecond] = useState(0)
    const [visible,setVisible] = useState(false)
    const [formRef,saveFormRef] = useState()
    const [editContent,setEditContent] = useState({})
    const selectHandler = (id,index) => {
         if(index !== activeIndex) {
            setActiveIndex(index)
            sessionStorage.setItem('activeIndex',index)
            setActiveSecond(0)
            Model.getSmallActivity(categoryList[index].id)
                .then(res => {
                    if(res.length) { 
                        let item  = categoryList.slice(0)
                        item[index].children = res
                        setCategory(item)
                        props.categoryChange(item[index])
                        props.secondChange && props.secondChange(res[0].id) 
                    } else {
                        props.categoryChange(categoryList[index])
                        props.secondChange(null)
                    }
            })
            }
    }
    const changeHandler = (id,index) => {
        setActiveSecond(index)
        props.secondChange(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCategory = (i) => {
            let params = {}
            if (props.type !== null) params.type = props.type 
            Model.getBigActivity(params)
            .then(data => {
                setCategory(data)
                let index = data[i] ? i : 0
                data.length ? Model.getSmallActivity(data[index].id)
                    .then(res => {
                        if(res.length) {
                            data[index].children = res
                            setCategory(data)
                            props.categoryChange(data[index])
                            props.secondChange && props.secondChange(res[activeSecond].id) 
                        } else {
                            props.categoryChange(categoryList[index])
                            props.secondChange(null)
                        }
                    }) :  props.categoryChange(null)          
            })
    }
    const handleOk = () => {
        const { form } = formRef.props
        form.validateFields((err, values) => {
          if (err) return
          Object.keys(editContent).length === 0 
            ?   Model.addActivityType({...values, })
                .then(({data}) => {
                if(data.status === 200) {
                    setVisible(false)
                    getCategory()
                } 
                })
            :   Model.updateActivityType({activityId:editContent.id,...values})
                .then(({data}) => {
                if(data.status === 200) {
                    setVisible(false)
                    getCategory()
                }
                })
        })
    }
    const edit = (item) => {
        setEditContent(item)
        setVisible(true)
    }
    const add = () => {
        setEditContent({})
        setVisible(true)
    }
    const del = (id) => {
        Model.deleteActivityType(id)
        .then(({data}) => {
        if(data.status === 200) {
            if (id === categoryList[activeIndex]) setActiveIndex(0)
            getCategory()
        }
        })
    }
    useEffect(() => {
        let index = sessionStorage.getItem('activeIndex')
        if (index) setActiveIndex(Number(index))
        getCategory(Number(index))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <div>
            <div className="first-level">
              {categoryList.map((item,index) => (
                <div key={item.name} className={`item ${index === activeIndex ? 'active': null}`} >
                  <span className="content" onClick={() => selectHandler(item.id,index)}>{item.name}</span>
                  {props.canEdit ? <span className="tool">
                   <Icon onClick={() => edit(item)} style={{fontSize: '12px'}} type="edit" />
                   <Icon onClick={() => add()} style={{fontSize: '12px'}} type="plus" />
                   <Icon onClick={() => del(item.id)} style={{fontSize: '12px'}} type="close" />
                  </span> : null}
                </div>
              ))
              }
            </div>
            {
              props.showSecond ? (
                <div className="second-level">
                {(categoryList[activeIndex] && categoryList[activeIndex].children) ? categoryList[activeIndex].children.map((item,index) => (
                    <div key={index} className={`item ${index === activeSecond ? 'active': null}`} onClick={() => changeHandler(item.id,index)}>{item.activityName}</div>
                  )) : null
                  }
                </div>
              ) : null
            }
            <CollectionCreateForm
                wrappedComponentRef={saveFormRef}
                visible={visible}
                onCancel={setVisible}
                key={editContent.id || ('-' + activeIndex)}
                handleOk={handleOk}
                info={editContent}
            />
        </div>
    )
}
CategoryList.defaultProps = {
    showSecond: true,
    canEdit: false,
    secondChange: () => {},
    categoryChange: () => {},
    type: null
}
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      state = {
        imgList0: this.props.info.bigIcon ? [{url: this.props.info.bigIcon,uid:'-2'}] : [],
        imgList1: this.props.info.smallIcon ? [{url: this.props.info.smallIcon,uid:'-1'}] : []
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
        let item = flag === 0 ? {bigIcon:''} : {smallIcon:''}
        setFieldsValue(item)
      }
      UNSAFE_componentWillReceiveProps(props) { // 父组件重传props时就会调用这个方法
        const { setFieldsValue, getFieldValue } = this.props.form
        if (props.info.bigIcon && !getFieldValue('bigIcon')) {
          setFieldsValue({ bigIcon: props.info.bigIcon })
        }
        if (props.info.smallIcon && !getFieldValue('smallIcon')) {
          setFieldsValue({ smallIcon: props.info.smallIcon })
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
            title="活动信息"
            cancelText="取消"
            okText="确定"
            onCancel={() => onCancel(false)}
            onOk={handleOk}
          >
            <Form  {...formItemLayout}>
                <Form.Item label="名称">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: '请填写公司名称' }],
                    initialValue: info.name || ''
                  })(<Input />)}
                </Form.Item> 
                <Form.Item label="类型">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择类型' }],
                    initialValue: info.type || ''
                  })(<Select>
                    <Option value={1}>商业活动</Option>
                    <Option value={2}>个人活动</Option>
                    <Option value={3}>社团活动</Option>
                  </Select>)}
                </Form.Item> 
                <Form.Item label="大类照片">
                  {getFieldDecorator('bigIcon', {
                      rules: [{ required: true, message: '请上传大类照片' }],
                      getValueFromEvent: (e) => this.normFile(e,0),
                    })(
                      <PicturesWall                   
                      onRemove={(e) => this.remove(e,0)}
                      onChange={(e) => this.pictureChange(e,0)}
                      fileList={this.state.imgList0}
                      maxCount={1}
                      data={{type: '3'}}/>
                    )}
                </Form.Item>
                <Form.Item label="大类小icon">
                  {getFieldDecorator('smallIcon', {
                      rules: [{ required: true, message: '请上传大类小icon' }],
                      getValueFromEvent: (e) => this.normFile(e,1),
                    })(
                      <PicturesWall                   
                      onRemove={(e) => this.remove(e,1)}
                      onChange={(e) => this.pictureChange(e,1)}
                      fileList={this.state.imgList1}
                      maxCount={1}
                      data={{type: '2'}}/>
                    )}
                </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );
export default CategoryList