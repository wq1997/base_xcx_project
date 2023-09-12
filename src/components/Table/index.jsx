import { View } from '@tarojs/components';
import "./index.scss";

const Table = ({ columns = [], dataSource = [] }) => {
    return (
        <View className="customTable">
            <View className="customTableHeader">
                {
                    columns.map(column => {
                        const { width, title, type } = column;
                        return (
                            <View className={`customTableHeaderItem ${type === "multiple" && "diagonal"}`} style={`width: ${width}`}>
                                {
                                    type === "multiple" && Array.isArray(title) && title.length === 2 &&
                                    <>
                                        <View className="customTableHeaderItemLeftBottom">{title[0]}</View>
                                        <View className="customTableHeaderItemRightTop">{title[1]}</View>
                                    </>
                                }
                                {
                                    type !== "multiple" &&
                                    <View>{title}</View>
                                }
                            </View>
                        )
                    })
                }
            </View>
            <View className="customTableContent">
                {
                    dataSource.map(data => {
                        return (
                            <View className="customTableContentRow">
                                {
                                    Object.keys(data).map((filed, index) => {
                                        const width = columns[index]?.width
                                        return (
                                            <View className="customTableContentCol" style={`width: ${width}`}>{data[filed]}</View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Table;