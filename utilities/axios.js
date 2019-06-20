import * as axios from 'axios'

let baseURL = 'http://localhost:8000'

export default axios.create(
    {
        baseURL: baseURL,
        withCredentials: true,
    }
)