import { ResidualSubCurrent } from "./residualSubCurrent";

export interface ResidualCurrent{
    id: number;
    code: string;
    name: string;
    residualSubCurrents: ResidualSubCurrent[];
}