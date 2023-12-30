import {InMemoryDbService, RequestInfo, } from "angular-in-memory-web-api"
import { Champion } from "../models/champion.model";

import champions_data from "../../assets/champion_info_2.json" 
export class MockData implements InMemoryDbService {
  private champions!: any[];
     createDb(reqInfo?: RequestInfo) {
        
        this.champions = Object.values(champions_data.data).filter(data => data.name !="None");
        
        if(reqInfo?.method == 'post') {
          this.champions.push(reqInfo.utils.getJsonBody(reqInfo.req))
        }
          return {champions: this.champions}
    }

}
