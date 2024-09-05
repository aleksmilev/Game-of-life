import { Note } from "../components/note/note.interface";
import { GridIndex } from "../components/table/grid-index.interface";

export interface CellConnection {
    self: GridIndex;
    target: GridIndex; 
}

export interface CellConnectionSettings {
    width: number;
    rotation: number; 
} 

export class CellConnectionManiger {
    public static cellConnections: CellConnection[] = [];

    public static areGridIndexesEqual(index1: GridIndex, index2: GridIndex): boolean {
        return index1.x === index2.x && index1.y === index2.y;
    }

    public static checkExistingConnection(cellConnection: CellConnection): boolean {
        return CellConnectionManiger.cellConnections.some(existingConnection => {
            return (
                (
                    CellConnectionManiger.areGridIndexesEqual(existingConnection.self, cellConnection.self) && 
                    CellConnectionManiger.areGridIndexesEqual(existingConnection.target, cellConnection.target)
                ) || (
                    CellConnectionManiger.areGridIndexesEqual(existingConnection.self, cellConnection.target) && 
                    CellConnectionManiger.areGridIndexesEqual(existingConnection.target, cellConnection.self)
                )
            );
        });
    }

    public static generateSettings(cellConnection: CellConnection, cell: Note): CellConnectionSettings {            
        const rotations: { [key: string]: number } = {
            '0,1'   : 0,
            '1,1'   : 45,
            '1,0'   : 90,
            '1,-1'  : 135,
            '0,-1'  : 180,
            '-1,-1' : 225,
            '-1,0'  : 270,
            '-1,1'  : 315,
        }    
        const targetPosition = `${cellConnection.target.y - cellConnection.self.y},${cellConnection.target.x - cellConnection.self.x}`;
    
        const rotation = rotations[targetPosition];
        const width = rotation % 10 === 5
            ? cell.size * 1.4
            : cell.size * 1;
    
        return {
            width: width,
            rotation: rotation
        };
    }

    public static getConnections(coordinates: GridIndex): CellConnection[]{
        return CellConnectionManiger.cellConnections.filter((connection: CellConnection) => {
            return CellConnectionManiger.areGridIndexesEqual(coordinates, connection.self);
        })
    }
}