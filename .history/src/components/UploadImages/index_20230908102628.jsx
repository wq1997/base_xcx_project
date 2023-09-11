import { View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { getBaseUrl } from "@/utils/request";
import { AtImagePicker } from 'taro-ui';
import './index.scss';
import { useState } from "react";

const UploadImage = (props) => {
    const [files, setFiles] = useState([])
    const { showAddBtn, maxLength } = props;

    const uploadLoader = (data) => {
        console.log(data);
        setFiles(data)
        const upload = () => {
           
        }
        upload()
    }

    const onImageClick = () => {

    }

    const onFail = () => {

    }

    return (
        <View
            className="uploadImages"
        >
            <AtImagePicker
                multiple={false}
                length={3}
                files={files}
                onChange={uploadLoader}
                onFail={onFail}
                onImageClick={onImageClick}
                showAddBtn={showAddBtn}
                count={maxLength}
            />
            <View className="tip">提示：最多可以选择{maxLength}张图片</View>
        </View>
    )
}

export default UploadImage;