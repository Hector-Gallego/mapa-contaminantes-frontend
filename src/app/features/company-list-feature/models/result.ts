import { Company } from "src/app/core";
import { Pageable } from "./pageable";

export interface Result{
    content: Company[],
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    numberOfElements: number;

}