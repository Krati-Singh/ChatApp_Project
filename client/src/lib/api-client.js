import axios from "axios";
import {HOST} from "@/utils/constants";


const apiClient = axios.create({
    baseURL: 'http://localhost:8797',
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;

