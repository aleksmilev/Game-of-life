import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../components/note/note.interface';
import { GridIndex } from '../components/table/grid-index.interface';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
	private dataSubject = new BehaviorSubject<Note[][]>([]);
	public data$ = this.dataSubject.asObservable();

	private static running: boolean = false;

	private static noteSize: number = 35;

	public generateNotesData(gridDimensions: GridIndex): Note[][] {
		const data: Note[][] = [];
		let idCounter = 1;

		for (let row = 0; row < gridDimensions.y; row++) {
			const rowData: Note[] = [];
			for (let col = 0; col < gridDimensions.x; col++) {
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
	}

	public generateCoordinates(): GridIndex[] {
		const range = [-1, 0, 1];

		return range
		.flatMap(x => range.map(y => ({ x, y })))
		.filter(coord => coord.x !== 0 || coord.y !== 0);
	}

	public getNumbeNeighbors(data: Note[][], gridDimensions: GridIndex, index: GridIndex): number {
		const neighborIndexes = this.generateCoordinates();

		let aliveNeighbors = 0;

		neighborIndexes.forEach((neighborIndex: GridIndex) => {
			const rowIndexTarget = Math.max(0, Math.min(index.y + neighborIndex.y, gridDimensions.y - 1));
			const colIndexTarget = Math.max(0, Math.min(index.x + neighborIndex.x, gridDimensions.x - 1));

			if (data[rowIndexTarget][colIndexTarget].alive) {
				aliveNeighbors++;
			}
		});

		return aliveNeighbors;
	}

	public updateData(gridDimensions: GridIndex): void {
		GameMechanicsService.running = !GameMechanicsService.running;

		const interval = setInterval(() => {
			const data: Note[][] = this.dataSubject.getValue();
			let aliveCells: boolean = false;

			const newData = data.map((row: Note[]) => {
				return row.map((note: Note) => {
					const aliveNeighbors = this.getNumbeNeighbors(data, gridDimensions, note.coordinates);
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

			if (!aliveCells) {
				setTimeout(() => {
					clearInterval(interval);
					alert('All cells are dead! Game ends!');
				});
			}
		}, 500);
	}
}
