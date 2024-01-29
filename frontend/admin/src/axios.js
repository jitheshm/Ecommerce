import axios from 'axios'
import {BASEURL} from "../src/constants/constant"

const instance = axios.create({
    baseURL:String(BASEURL) ,
    
   
  });

  export default instance;