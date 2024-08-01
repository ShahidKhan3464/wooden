import axios from 'axios';

const baseurl = 'https://woodendoordev.com/api/properties/CreateProperties?employeeID=1'

const VALID_SUCCESS_CODE = [200, 201, 202, 203, 204];



class Api {
    static headers(token) {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    static request(
        type,
        route,
        token,
        params,
    ) {
        return this.func(route, params, type, token);
    }
    static async postFormData(endPoint, formdata) {
        return fetch(baseurl + endPoint, {
            method: 'POST',
            body: formdata,
        })
            .then(response => {
                let json = response.json();
                console.log(json)
                if (response.ok) {
                    return json;
                }
            })
            .catch(err => {
                console.log(err);
                throw null;
            });
    }

    static request2(
        type,
        route,
        token,
        params,
    ) {
        return this.func2(route, params, type, token);
    }


    static formRequest({ method, url, token, data = {} }) {
        return axios({
            method,
            url: baseurl,
            data,
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        })
            .then((resp) => {
                return resp.data;
            })
            .catch(async (error) => {
                console.log(
                    'ERROR IN Api response is !------------->>>>>>',
                    error.response.data,
                    url,
                );
            });
    }

    static async func(
        route,
        params,
        verb,
        token,
    ) {
        const url = baseurl;
        const options = {
            method: verb,
            url,
            data: JSON.stringify(params),
            timeout: 20000,
            validateStatus: (status) => VALID_SUCCESS_CODE.includes(status),
        };
        options.headers = this.headers(token);
        return axios(options)
            .then((resp) => {
                return resp.data;
            })
            .catch(async (error) => {
                console.log(
                    'ERROR IN Api response is !------------->>>>>>',
                    error.response.data,
                    url,
                );
              
            });
    }

    static async func2(
        route,
        params,
        verb,
        token,
    ) {
        const url = `${route}`;
        const options = {
            method: verb,
            url,
            data: JSON.stringify(params),
            validateStatus: (status) => VALID_SUCCESS_CODE.includes(status),
        };
        console.log(options, 'optionsoptionsoptionsoptionsoptions')
        options.headers = this.headers(token);
        return axios(options)
            .then((resp) => {
                return resp.data;
            })
            .catch(async (error) => {
                console.log(
                    'ERROR IN Api response is !------------->>>>>>',
                    error.response.data,
                    url,
                );

            });
    }
}
export default Api;