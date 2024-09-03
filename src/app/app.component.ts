import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'Game of life';
	
	public data: Note[][] = this.generateNotesData(15, 15);

	private generateNotesData(height: number, length: number): Note[][] {
		const data: Note[][] = [];
		let idCounter = 1;
	  
		for (let row = 0; row < height; row++) {
		  const rowData: Note[] = [];
		  for (let col = 0; col < length; col++) {
			rowData.push({
			  id: idCounter++,
			  alive: Math.random() < 0.5
			});
		  }
		  data.push(rowData);
		}
	  
		return data;
	}

	private updateSingleNote(rowIndexTarget: number, colIndexTarget: number): void {
		const newData = this.data.map((row, rowIndex) => {
			return row.map((note, colIndex) => {
				if (rowIndex === rowIndexTarget && colIndex === colIndexTarget) {
				return { ...note, alive: !note.alive };
				}
				return note;
			});
		});
	
		this.data = newData; 
	}

	public updateData(): void {

	}
}
