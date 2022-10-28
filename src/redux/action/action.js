import { GetApiDetails, PostApiDetails } from "../../api/axiosRequest";
import { GET_DETAILS, POST_DETAILS } from "../type";

const GetApiAction = () => {
    return function (dispatch) {
        return GetApiDetails().then((res) => {
            console.log('Response', res);
            dispatch({
                type: 'GET_DETAILS',
                payload: res.data.data,
            })
        })
    };
};

const PostApiAction = (request) => {
    return function (dispatch) {
        return PostApiDetails(request).then((res) => {
            console.log('Response', res);
            dispatch({
                type: 'POST_DETAILS',
                payload: '',
            })
        })
    };
};

export { GetApiAction, PostApiAction };