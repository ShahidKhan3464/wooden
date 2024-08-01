import axios from 'axios';

const VALID_SUCCESS_CODE = [200, 201, 202, 203, 204];
class Api {
    static headers(token) {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }
    static request(type, route, token, params) {
        return this.func(route, params, type, token);
    }


    static formRequest({ method, url, token, data = {} }) {
        return axios({
            method,
            url: `${url}`,
            data,
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        })
            .then(res => res.data)
            .catch(err => {
                throw err;
            });
    }

    static async func(route, params, verb, token) {
        const url = `${route}`;

        const options = {
            method: verb,
            url,
            data: JSON.stringify(params),
            timeout: 20000,
            validateStatus: status => VALID_SUCCESS_CODE.includes(status),
        };
        options.headers = this.headers(token);
        return axios(options)
            .then(resp => {

                return resp.data;
            })
            .catch(async error => {
                console.log(
                    'ERROR IN Api response is !------------->>>>>>',
                    error,
                    url,
                );
            });
    }
}
export default Api;