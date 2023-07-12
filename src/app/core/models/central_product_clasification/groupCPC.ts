import { DivisionCPC } from "./divisionCPC";

export interface GroupCPC{
    id: number; 
    code: string;
    name: string; 
    divisionCPC: DivisionCPC;
}