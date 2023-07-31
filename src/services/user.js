import { request } from "@/utils/request";

export const getUserInfo = (params) => {
    console.log("params", params)
    return request("/wangqing/user", {
        method: "GET",
        body:params
    })
}