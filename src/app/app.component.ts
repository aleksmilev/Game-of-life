import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';
import { GridIndex } from './components/table/grid-index.interface';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'Game of life';
	
	private gridDimensions: GridIndex = { x: 15, y: 15};

	public data: Note[][] = this.generateNotesData(this.gridDimensions);

	private generateNotesData(gridDimensions: GridIndex): Note[][] {
		const data: Note[][] = [];
		let idCounter = 1;
	  
		for (let row = 0; row < gridDimensions.y; row++) {
		  const rowData: Note[] = [];
		  for (let col = 0; col < gridDimensions.x; col++) {
			rowData.push({
			  	id: idCounter++,
			  	alive: Math.random() < 0.2,
				coordinates: {
					x: col,
					y: row
				}
			});
		  }
		  data.push(rowData);
		}
	  
		return data;
	}

	private updateSingleNote(indexTarget: GridIndex, alive: boolean): void {
		const newData = this.data.map((row, rowIndex) => {
			return row.map((note, colIndex) => {
				if (rowIndex === indexTarget.y && colIndex === indexTarget.x) {
					return { ...note, alive: alive };
				}

				return note;
			});
		});
	
		this.data = newData; 
	}

	private generateCoordinates(): GridIndex[] {
		const range = [-1, 0, 1];
		return range.flatMap(x => 
			range.map(y => ({ x, y }))
		).filter(coord => coord.x !== 0 || coord.y !== 0);
	}

	private getNumbeNeighbors(index: GridIndex): number {
		const neighborIndexes = this.generateCoordinates();
		
		let aliveNeighbors = 0;

		neighborIndexes.forEach((neighborIndex: GridIndex) => {
			let rowIndexTarget = Math.max(0, Math.min(index.y + neighborIndex.y, this.gridDimensions.y - 1));
			let colIndexTarget = Math.max(0, Math.min(index.x + neighborIndex.x, this.gridDimensions.x - 1));
			
			if(this.data[rowIndexTarget][colIndexTarget].alive){
				aliveNeighbors++;
			}
		})

		return aliveNeighbors;
	}

	public updateData(): void {
		setInterval(() => {
			this.data.forEach((row: Note[]) => {
				row.forEach((note: Note) => {
					const aliveNeighbors = this.getNumbeNeighbors(note.coordinates);
					const shouldBeAlive = note.alive ? aliveNeighbors === 2 || aliveNeighbors === 3 : aliveNeighbors === 3;
	
					if (note.alive !== shouldBeAlive) {
						this.updateSingleNote(note.coordinates, shouldBeAlive);
					}
				});
			});
		}, 5000);
	}
}
