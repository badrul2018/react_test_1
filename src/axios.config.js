import axios from "axios";

const getBaseURL=()=>{
    return {baseURL:"https://www.themealdb.com/api/json/v1/1/"}
}
const restapi=axios.create(getBaseURL())
export default restapi;