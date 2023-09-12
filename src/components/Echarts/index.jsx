import echarts from "cr_echarts_min";
import ReactEcharts from "taro-react-echarts";

const Echarts = (props) => {
    return (
        <ReactEcharts echarts={echarts} {...props} />
    )
}

export default Echarts;