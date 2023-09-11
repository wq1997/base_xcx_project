import { View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { getBaseUrl } from "@/utils/request";
import { AtImagePicker } from 'taro-ui';
import './index.scss';
import { useState } from "react";

const UploadImage = (props) => {
    const [files, setFiles] = useState([])
    const { showAddBtn, maxLength, fileNames, setFileNames } = props;

    const uploadLoader = (data) => {
        console.log(data?.length, files?.length)
        setFiles(data) 
        if(data?.length< files?.length) return
        Taro.showLoading({
            title: `正在上传第${data?.length}张`
        })
        Taro.uploadFile({
            url: getBaseUrl() + '/feedback/uploadFeedbackImage',
            header: {
                'content-type': 'multipart/form-data',
            },
            name: 'file',
            filePath: data[data?.length - 1].url,
            success: (resp) => {
                setFileNames([
                    ...fileNames,
                    JSON.parse(resp?.data)?.data
                ])
                Taro.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                });
                Taro.hideLoading();
            },
            fail: () => {
                Taro.hideLoading();
            },
        })
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
                showAddBtn={files?.length < 6}
                count={maxLength}
            />
            <View className="tip">提示：最多可以选择{maxLength}张图片</View>
        </View>
    )
}

export default UploadImage;