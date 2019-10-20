import React,{ useState, useEffect } from 'react'
import './category.scss'
import { Input, Button } from 'antd'
import PicturesWall from '../../components/PicturesWall'
import Model from '../../model'
function CategoryList (props) {
    const [categoryList,setCategory] = useState([])
    const [activeIndex,setActiveIndex] = useState(0)
    const [activeSecond,setActiveSecond] = useState(0)
    const selectHandler = (index) => {
         if(index !== activeIndex) {
            setActiveIndex(index)
            setActiveSecond(0)
            if(!categoryList[index].children) {
                Model.getSmallActivity(categoryList[index].id)
                    .then(res => {
                        if(res.length) {
                            let item  = categoryList[index]
                            item.children = res
                            setCategory(item)
                            props.secondChange && props.secondChange(res[activeSecond].id) 
                        }
                })
                }  else {
                    props.secondChange && props.secondChange(categoryList[index]['children'][activeSecond].id)
                }
            }
    }
    const getCategory = () => {
            Model.getBigActivity()
            .then(data => {
                props.showSecond 
                ? Model.getSmallActivity(data[activeIndex].id)
                    .then(res => {
                        if(res.length) {
                            data[activeIndex].children = res
                            setCategory(data)
                            props.secondChange && props.secondChange(res[activeSecond].id) 
                        }
                    }) : setCategory(data)
                                    
            })
    }
    useEffect(() => {
        getCategory()
    },[])
    return(
        <div>
            <div className="first-level">
              {categoryList.map((item,index) => (
                <div key={item.name} className={`item ${index === activeIndex ? 'active': null}`} onClick={() => selectHandler(index)}>{item.name}</div>
              ))
              }
            </div>
            { 
                props.showEdit ?  (<div className="first-level-edit">
                                    <div className="name">
                                        <div className="title">添加活动大类</div>
                                        <Input placeholder="大类名称" />
                                    </div>
                                    <div className="item">
                                        <div className="title">上传大类照片</div>
                                        <PicturesWall/>
                                    </div>
                                    <div className="item">
                                        <div className="title">上传大类小icon</div>
                                        <PicturesWall/>
                                    </div>
                                    <Button type="primary" loading>
                                        保存
                                    </Button>
                                    </div>) : null
            }
            {
              props.showSecond ? (
                <div className="second-level">
                {categoryList[activeIndex] && categoryList[activeIndex].children ? categoryList[activeIndex].children.map((item,index) => (
                    <div key={index} className={`item ${index === activeSecond ? 'active': null}`} onClick={() => setActiveSecond(index)}>{item.activityName}</div>
                  )) : null
                  }
                </div>
              ) : null
            }
        </div>
    )
}
CategoryList.defaultProps = {
    showSecond: true
  }
export default CategoryList