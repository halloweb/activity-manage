import React from 'react'
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  static defaultProps = {
           fileList : [],
           onChange: () => {},
           onRemove: () => {},
           beforeUpload: () => {},
           maxCount: 9
         }
  state = {
    previewVisible: false,
    previewImage: ''
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  render() {
    const { previewVisible, previewImage} = this.state;
    const uploadButton = (
      <div >
        <Icon style={{fontSize: '30px'}} type="plus" />
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`/api/file/uploadFile`}
          listType="picture-card"
          withCredentials={true}
          data={this.props.data}
          fileList={this.props.fileList}
          onPreview={this.handlePreview}
          onChange={this.props.onChange}
          onRemove={this.props.onRemove}
          beforeUpload={this.props.beforeUpload}
          accept=".png, .jpg, .jpeg"
        >
          {this.props.fileList.length >= this.props.maxCount ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}