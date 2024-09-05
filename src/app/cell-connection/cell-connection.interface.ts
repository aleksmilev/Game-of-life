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
    public static cellConnections: CellConnection[];

    private static areGridIndexesEqual(index1: GridIndex, index2: GridIndex): boolean {
        return index1.x === index2.x && index1.y === index2.y;
    }

    public static checkExistingConnection(cellConnection: CellConnection): boolean {
        return this.cellConnections.some(existingConnection => {
            return (
                (
                    this.areGridIndexesEqual(existingConnection.self, cellConnection.self) && 
                    this.areGridIndexesEqual(existingConnection.target, cellConnection.target)
                ) || (
                    this.areGridIndexesEqual(existingConnection.self, cellConnection.target) && 
                    this.areGridIndexesEqual(existingConnection.target, cellConnection.self)
                )
            );
        });
    }

    public static generateSettings(cellConnection: CellConnection, cell: Note): CellConnectionSettings {
        this.cellConnections.push(cellConnection);
    
        const rotations: { [key: string]: number } = {
            '1,0'   : 0,
            '1,-1'  : 45,
            '0,-1'  : 90,
            '-1,-1' : 135,
            '-1,0'  : 180,
            '-1,1'  : 225,
            '0,1'   : 270,
            '1,1'   : 315,
        }
        const targetPosition = `${cellConnection.target.x - cellConnection.self.x},${cellConnection.target.y - cellConnection.self.y}`;
    
        const rotation = rotations[targetPosition];
        const width = rotation % 10 === 5
            ? cell.size * 2 * Math.PI
            : cell.size * 2;
    
        return {
            width: width,
            rotation: rotation
        };
    }
    
}