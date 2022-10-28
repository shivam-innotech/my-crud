import axios from "axios";

export async function AxiosRequest(url, method, headers, params) {
    return params
        ? axios({
            url: url,
            method: method,
            headers: headers,
            data: params,
            timeouts: 1000,
        })
        : axios({
            url,
            method: method,
            headers: headers,
            data: {},
            timeouts: 1000,
        })
}

const GetApiDetails = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return AxiosRequest('https://secure-refuge-14993.herokuapp.com/list_polls', 'GET', headers, {});
};

const PostApiDetails = (data) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return AxiosRequest('https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4', 'POST', headers, data);
};

export { GetApiDetails, PostApiDetails };