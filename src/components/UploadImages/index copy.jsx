import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getBaseUrl } from '@/utils/request';
import { AtImagePicker } from 'taro-ui';
import './index.scss';
import Tips from '@/utils/tips';
import { useState } from 'react';

const acceptTypes = ['.jpg', '.jpeg', '.png', '.bmp'];
const maxSizeMB = 1;
const maxCount = 6;

const UploadImage = (props) => {
    const [files, setFiles] = useState([]);
    const { fileNames, setFileNames } = props;

    const uploadLoader = (data, _, index) => {
        if (data?.length > 0) {
            if (data?.length > 6) return Tips.toast('最多上传6张图片');
            const { size, path } = data[data?.length - 1]?.file;
            const suffix = path.substring(path.lastIndexOf('.'));
            if (!acceptTypes.includes(suffix)) return Tips.toast('上传图片格式不被允许');
            if (size > maxSizeMB * 1024 * 1024) return Tips.toast(`上传图片大小不得超过${maxSizeMB}MB`);
        }
        setFiles(data);
        if (data?.length < files?.length) {
            const _fileNames = [...fileNames];
            _fileNames.splice(index, 1);
            setFileNames(_fileNames);
            return;
        }
        Taro.showLoading({
            title: `正在上传第${data?.length}张`
        });
        Taro.uploadFile({
            url: getBaseUrl() + '/feedback/uploadFeedbackImage',
            header: {
                'content-type': 'multipart/form-data'
            },
            name: 'file',
            filePath: data[data?.length - 1].url,
            success: (resp) => {
                setFileNames([...fileNames, JSON.parse(resp?.data)?.data]);
                Taro.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                });
                Taro.hideLoading();
            },
            fail: () => {
                Taro.showToast({
                    title: '上传失败',
                    icon: 'fail',
                    duration: 3000
                });
                const _files = [...files];
                _files.splice(data?.length - 1, 1);
                setFiles(_files);
                Taro.hideLoading();
            }
        });
    };

    const onImageClick = () => { };

    const onFail = () => { };

    return (
        <View className="uploadImages">
            <AtImagePicker
                multiple={false}
                length={3}
                files={files}
                onChange={uploadLoader}
                onFail={onFail}
                onImageClick={onImageClick}
                showAddBtn={files?.length < 6}
                count={maxCount}
            />
            <View className="tip">
                <View
                    style={{
                        width: '60px'
                    }}
                >
                    提示：
                </View>
                <View>
                    最多可上传{maxCount}张图片，请上传 .jpg .jpeg .png .bmp 格式图片，大小不超过1MB
                </View>
            </View>
        </View>
    );
};

export default UploadImage;
