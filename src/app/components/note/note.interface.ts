import { GridIndex } from "../table/grid-index.interface";

export interface Note {
    id: number;
    alive: boolean; 
    coordinates: GridIndex
}