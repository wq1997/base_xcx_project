import { View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { getBaseUrl } from "@/utils/request";
import { AtImagePicker } from 'taro-ui';
import './index.scss';

const UploadImage = (props) => {
    const { showAddBtn, files, maxLength } = props;

    const uploadLoader = (data) => {
        console.log(data);
        let i = 0;
        const upload = () => {
            Taro.showLoading({
                title: `正在上传第${i + 1}张`
            })
            Taro.uploadFile({
                url: getBaseUrl() + '/feedback/uploadFeedbackImage',
                header: {
                    'content-type': 'multipart/form-data',
                },
                name: 'file',
                filePath: data[i].url,
                success: (resp) => {
                    console.log(resp)
                    i++;
                    if (data.length === i) {
                        Taro.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        });
                        Taro.hideLoading();
                    } else {
                        upload();
                    }
                },
                fail: () => {
                    Taro.hideLoading();
                },
            })
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