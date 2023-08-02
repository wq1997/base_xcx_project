import echarts from "@/assets/echarts/echarts.min"
import ReactEcharts from "taro-react-echarts";

const Echarts = (props) => {
    return (
        <ReactEcharts echarts={echarts} {...props} />
    )
}

export default Echarts;