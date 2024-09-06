import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../components/note/note.interface';
import { GridIndex } from '../components/table/grid-index.interface';
import { CellConnection, CellConnectionManiger } from '../cell-connection/cell-connection';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GameMechanicsService {
	private dataSubject = new BehaviorSubject<Note[][]>([]);
	public data$ = this.dataSubject.asObservable();

	public static running: boolean = false;
	public static gridDimensions: GridIndex = { x: 0, y: 0 };

	public static noteSize: number = 32;

	constructor(private toastr: ToastrService){}

	public generateNotesData(): Note[][] {
		const data: Note[][] = [];
		let idCounter = 1;

		this.calculateBoxes();

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

	public calculateBoxes() {
		const marginWidth = 80;
		const marginHeight = 101;
		
		const width = window.innerWidth - (2 * marginWidth); 
		const height = window.innerHeight - (2 * marginHeight); 
	
		GameMechanicsService.gridDimensions = {
			x: Math.floor(width / GameMechanicsService.noteSize),
			y: Math.floor(height / GameMechanicsService.noteSize)
		}		
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
			let aliveCells: Note[] = [];

			const newData = data.map((row: Note[]) => {
				return row.map((note: Note) => {
					const aliveNeighbors = this.getNeighbors(data, note.coordinates).length;
					const shouldBeAlive = note.alive ? aliveNeighbors === 2 || aliveNeighbors === 3 : aliveNeighbors === 3;

					if (note.alive){
						aliveCells.push(note);
					}

					if (note.alive !== shouldBeAlive) {
						return { ...note, alive: shouldBeAlive };
					}

					return note;
				});
			});

			this.dataSubject.next(newData);

			if (aliveCells.length == 0) {
				setTimeout(() => {
					clearInterval(interval);
					
					if (GameMechanicsService.running) {
						GameMechanicsService.running = false;
						this.toastr.error(
							'All cells are dead!', 
							'Game ends', 
							{
								positionClass: 'toast-top-center',
								titleClass: 'custom-toast-title',
								timeOut: 2000, 
							}
						);
					} else {
						this.toastr.success(
							'You kill all of the cells!', 
							'Game ends', 
							{
								enableHtml: true,
								positionClass: 'toast-top-center',
    							titleClass: 'custom-toast-title',
								timeOut: 2000,
							}
						);
						setTimeout(() => {
							this.toastr.success(
								'You killed them all, <br>or not just the men, <br>but the women and children too',
								'',
								{
									enableHtml: true,
									positionClass: 'toast-top-center',
									titleClass: 'custom-toast-title',
									timeOut: 4000,
								}
							)
						}, 1900)
					}
				});
			}

			this.updateConnections();
		}, 500);
	}
}