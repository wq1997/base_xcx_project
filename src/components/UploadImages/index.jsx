import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getBaseUrl } from '@/utils/request';
import { AtImagePicker } from 'taro-ui';
import './index.scss';
import Tips from '@/utils/tips';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/authTools';

const acceptTypes = ['.jpg', '.jpeg', '.png', '.bmp'];
const maxSizeMB = 1;
const maxCount = 6;

let uploadedFiles = []
let uploadedNames = []

const UploadImage = (props) => {
    const [files, setFiles] = useState([]);
    const { fileNames, setFileNames } = props;

    useEffect(() => {
        uploadedFiles = []
        uploadedNames = []
    }, [])

    const uploadLoader = async (data, _, index) => {

        if (data?.length > 0) {
            if (data?.length > maxCount) return Tips.toast(`最多上传${maxCount}张图片`);
            for (const item of data) {
                const { size, path } = item?.file;
                const suffix = path.substring(path.lastIndexOf('.'));
                if (!acceptTypes.includes(suffix)) return Tips.toast('上传图片格式不被允许');
                if (size > maxSizeMB * 1024 * 1024) return Tips.toast(`上传图片大小不得超过${maxSizeMB}MB`);
            }
        }

        if (data?.length < files?.length) {
            const _fileNames = [...fileNames];
            _fileNames.splice(index, 1);
            uploadedNames.splice(index, 1);
            setFileNames(_fileNames);
            const _files = [...files];
            _files.splice(index, 1);
            uploadedFiles.splice(index, 1);
            setFiles(_files);
            return;
        }

        for (const item of data.entries()) {
            const [index, temp] = item
            if (!temp?.uploaded) {
                Taro.showLoading({
                    title: `正在上传第${index + 1}张`
                });
                await Taro.uploadFile({
                    url: getBaseUrl() + '/feedback/uploadFeedbackImage',
                    header: {
                        'content-type': 'multipart/form-data',
                        Token: getToken()
                    },
                    name: 'file',
                    filePath: temp?.file?.path,
                    success: (resp) => {
                        const res = JSON.parse(resp?.data)
                        if (res?.code == '200') {
                            uploadedFiles.push({
                                ...temp,
                                uploaded: true
                            })
                            uploadedNames.push(JSON.parse(resp?.data)?.data)
                            Taro.showToast({
                                title: '上传成功',
                                icon: 'success',
                                duration: 2000
                            });
                        } else {
                            Taro.showToast({
                                title: '上传失败',
                                icon: 'fail',
                                duration: 3000
                            });
                        }
                        Taro.hideLoading();
                    },
                    fail: () => {
                        Taro.showToast({
                            title: '上传失败',
                            icon: 'fail',
                            duration: 3000
                        });
                        Taro.hideLoading();
                    }
                });
            }
            if (data?.length - 1 == index) {
                setFiles([...uploadedFiles])
                setFileNames([...uploadedNames])
            }
        }
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
