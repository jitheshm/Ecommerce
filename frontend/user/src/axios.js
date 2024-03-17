import axios from 'axios'
import {BASEAPIURL} from "../src/constants/constant"

const instance = axios.create({
    baseURL:String(BASEAPIURL) ,
    
   
  });

  export default instance;