import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const uploadUrl = window.location.hostname;
// console.log(window.location);
const props = {
  name: "file",
  multiple: false,
  mode: "no-cors",
  showUploadList: false,
  action: `http://${uploadUrl}:3001/show-image`,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} файл загружен.`);
    } else if (status === "error") {
      message.error(`${info.file.name} ошибка загрузки файла.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const App = () => (
  <div stayle={{ height: "100%" }}>
    <Dragger {...props} stayle={{ height: "100%" }}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Нажмите или перетащите файл для показа
      </p>
    </Dragger>
  </div>
);
export default App;
