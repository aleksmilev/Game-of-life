import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../components/note/note.interface';
import { GridIndex } from '../components/table/grid-index.interface';
import { CellConnection, CellConnectionManiger } from '../cell-connection/cell-connection';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
	private dataSubject = new BehaviorSubject<Note[][]>([]);
	public data$ = this.dataSubject.asObservable();

	public static running: boolean = false;
	public static gridDimensions: GridIndex = { x: 15, y: 15 };

	public static noteSize: number = 35;

	public generateNotesData(): Note[][] {
		const data: Note[][] = [];
		let idCounter = 1;

		for (let row = 0; row < GameMechanicsService.gridDimensions.y; row++) {
			const rowData: Note[] = [];
			for (let col = 0; col < GameMechanicsService.gridDimensions.x; col++) {
				rowData.push({
				id: idCounter++,
				alive: false,
				size: GameMechanicsService.noteSize,
				coordinates: { x: col, y: row },
				connections: []
				});
			}
			data.push(rowData);
		}

		this.dataSubject.next(data);
		return data;
	}

	public generateCoordinates(): GridIndex[] {
		const range = [-1, 0, 1];

		return range
		.flatMap(x => range.map(y => ({ x, y })))
		.filter(coord => coord.x !== 0 || coord.y !== 0);
	}

	public getNeighbors(data: Note[][], index: GridIndex): Note[]{
		const neighborIndexes = this.generateCoordinates();

		return neighborIndexes
			.map(({ x, y }) => {
				const rowIndexTarget = index.y + y;
				const colIndexTarget = index.x + x;
				return data[rowIndexTarget]?.[colIndexTarget];
			})
			.filter((neighbor) => neighbor && neighbor.alive) as Note[];
	}

	public updateConnections(): void {
		const data: Note[][] = this.dataSubject.getValue();

		data.forEach((row: Note[]) => {
			row.forEach((note: Note) => {
				if(note.alive){
					this.getNeighbors(data, note.coordinates).forEach((neighbor: Note) => {
						const cellConnection: CellConnection = {
							self: note.coordinates,
							target: neighbor.coordinates
						};

						if(!CellConnectionManiger.checkExistingConnection(cellConnection)){
							CellConnectionManiger.cellConnections.push(cellConnection)
						}
					});
				} else {
					CellConnectionManiger.cellConnections = CellConnectionManiger.cellConnections.filter((cellConnection: CellConnection) => {
						return (
							!CellConnectionManiger.areGridIndexesEqual(note.coordinates, cellConnection.self) &&
							!CellConnectionManiger.areGridIndexesEqual(note.coordinates, cellConnection.target)
						);
					});
				}			
			});
		});
	}

	public updateSingleNote(indexTarget: GridIndex, alive: boolean): void {
		const data: Note[][] = this.dataSubject.getValue();
		const newData = data.map((row, rowIndex) => {
			return row.map((note, colIndex) => {
				if (rowIndex === indexTarget.y && colIndex === indexTarget.x) {
					return { ...note, alive: alive };
				}
			
				return note;
			});
		});

		this.dataSubject.next(newData);
		this.updateConnections();
	}

	public updateData(): void {
		GameMechanicsService.running = true;

		const interval = setInterval(() => {
			const data: Note[][] = this.dataSubject.getValue();
			let aliveCells: boolean = false;

			const newData = data.map((row: Note[]) => {
				return row.map((note: Note) => {
					const aliveNeighbors = this.getNeighbors(data, note.coordinates).length;
					const shouldBeAlive = note.alive ? aliveNeighbors === 2 || aliveNeighbors === 3 : aliveNeighbors === 3;

					if (note.alive !== shouldBeAlive) {
						return { ...note, alive: shouldBeAlive };
					}

					if (note.alive && !aliveCells){
						aliveCells = true;
					}

					return note;
				});
			});

			this.dataSubject.next(newData);
			this.updateConnections();

			if (!aliveCells) {
				setTimeout(() => {
					clearInterval(interval);
					GameMechanicsService.running = false;
					alert('All cells are dead! Game ends!');
				});
			}
		}, 500);
	}
}
