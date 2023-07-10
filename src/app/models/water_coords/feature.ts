import { Geometry } from "./geometry";
import { Property } from "./property";

export interface Feature{
    type : string
    properties : Property;
    geometry : Geometry;
}