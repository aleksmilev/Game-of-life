import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';
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
	  this.data = this.gameMechanics.generateNotesData();
	}
    
	public updateData(): void {
		if(!GameMechanicsService.running){
			this.gameMechanics.updateData();
		}else{
			alert("The game is already running!");
		}
	}
  
	public updateClickedNote(note: Note){
	  this.gameMechanics.updateSingleNote(note.coordinates, !note.alive);
	}
}
