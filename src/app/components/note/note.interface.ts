import { GridIndex } from "../table/grid-index.interface";

export interface Note {
    id: number;
    alive: boolean; 
    size: number;
    coordinates: GridIndex;
    connections: GridIndex[];
}