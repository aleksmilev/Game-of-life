import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';
import { GridIndex } from './components/table/grid-index.interface';
import { GameMechanicsService } from './services/game-mechanics.service';
import { CellConnectionManiger } from './cell-connection/cell-connection.interface';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Game of life';

	public data: Note[][];
  
	constructor(private gameMechanics: GameMechanicsService) {
	  this.gameMechanics.data$.subscribe(data => this.data = data);
	  this.data = this.gameMechanics.generateNotesData(this.gridDimensions);
	}
  
	private gridDimensions: GridIndex = { x: 15, y: 15 };
  
	public updateData(): void {
	//   this.gameMechanics.updateData(this.gridDimensions);
		let test = CellConnectionManiger.generateSettings(
			{
				self: { x: 1, y: 1 },
				target:  { x: 1, y: 2 }
			},
			this.data[1][1]
		)

		console.log(test);
	}
  
	public updateClickedNote(note: Note){
	  this.gameMechanics.updateSingleNote(note.coordinates, !note.alive);
	}
}
