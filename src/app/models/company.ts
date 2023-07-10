import { EconomyActivity } from "./economy_activity/economicActivity";
export interface Company{
    
    id : number;
    name: string;
    longitude: string;
    latitude: string;
    adress : string;
    economyActivityCIIUs: EconomyActivity[];
}