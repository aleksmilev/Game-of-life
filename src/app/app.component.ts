import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';
import { GridIndex } from './components/table/grid-index.interface';
import { GameMechanicsService } from './services/game-mechanics.service';

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
	  this.gameMechanics.updateData(this.gridDimensions);
	}
  
	public updateClickedNote(note: Note){
	  this.gameMechanics.updateSingleNote(note.coordinates, !note.alive);
	}
}
