import { CentralProductClasification } from "../central_product_clasification/centralproductClasification";
import { ResidualCurrent } from "../residualCurrent";
import { GroupCIIU } from "./groupCIIU";

export interface EconomyActivity{

    id: number;
    code: string;
    name : string;
    groupCIIU: GroupCIIU;
    centralProductClasificationCPCs: CentralProductClasification[];
    residualCurrents : ResidualCurrent[];
    

}