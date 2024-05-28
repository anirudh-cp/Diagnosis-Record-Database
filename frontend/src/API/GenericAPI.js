import axiosInstance from "./axios";
import localforage from "localforage";


export default class GenericAPI {

    async get(url, params=null) {
        try {
            const token = await localforage.getItem('access_token');
            const response = await axiosInstance.get(url,
                {
                    'params': params, 
                    'headers': {
                        "Authorization": "JWT " + token
                    },
                });

            return { "code": response.status, "data": response.data };

        } catch (error) {
            if (error.response) {
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response.status)
                return { "code": error.response.status, "data": error.response.data }
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
                return { "code": -1, "data": error.request }
            }
            else if (error === "SendLogin") {
                return { "code": -2, "data": "Send user to Login" }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                return { "code": -3, "data": error.message }
            }
        }
    }


    async post(url, body) {
        try {
            const token = await localforage.getItem('access_token');

            const response = await axiosInstance.post(url, body,
                {
                    headers: {
                        "Authorization": "JWT " + token
                    },
                });

            return { "code": response.status, "data": response.data };

        } catch (error) {
            if (error.response) {
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response.status)
                return { "code": error.response.status, "data": error.response.data }
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
                return { "code": -1, "data": error.request }
            }
            else if (error === "SendLogin") {
                return { "code": -2, "data": "Send user to Login" }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                return { "code": -3, "data": error.message }
            }
        }
    }


    async put(url, body, contentType='application/json') {
        try {
            const token = await localforage.getItem('access_token');

            const response = await axiosInstance.put(url, body,
                {
                    headers: {
                        "Authorization": "JWT " + token,
                        'Content-Type': contentType, 
                    },
                });

            return { "code": response.status, "data": response.data };

        } catch (error) {
            if (error.response) {
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response.status)
                return { "code": error.response.status, "data": error.response.data }
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
                return { "code": -1, "data": error.request }
            }
            else if (error === "SendLogin") {
                return { "code": -2, "data": "Send user to Login" }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                return { "code": -3, "data": error.message }
            }
        }
    }


    async delete(url) {
        try {
            const token = await localforage.getItem('access_token');

            const response = await axiosInstance.delete(url,
                {
                    headers: {
                        "Authorization": "JWT " + token
                    },
                });

            return { "code": response.status, "data": response.data };

        } catch (error) {
            if (error.response) {
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response.status)
                return { "code": error.response.status, "data": error.response.data }
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
                return { "code": -1, "data": error.request }
            }
            else if (error === "SendLogin") {
                return { "code": -2, "data": "Send user to Login" }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                return { "code": -3, "data": error.message }
            }
        }
    }


    async downloadFile(path, outFileName) {

        let responseData = 404;
        
        try {
            await axiosInstance({
                url: path,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {

                // create file link in browser's memory
                responseData = response.status
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', outFileName + '.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);

                return { "code": responseData };
            });
        }
        catch (error) {
            return { "code": error.response.status }
        }

        return { "code": responseData };
    }

}