import { Component } from '@angular/core';
import { Note } from './components/note/note.interface';
import { GameMechanicsService } from './services/game-mechanics.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Game of life';

	public data: Note[][];
  
	constructor(
		private gameMechanics: GameMechanicsService,
		private toastr: ToastrService
	) {
	  this.gameMechanics.data$.subscribe(data => this.data = data);
	  this.data = this.gameMechanics.generateNotesData();
	}
    
	public updateData(): void {
		if(!GameMechanicsService.running){
			this.gameMechanics.updateData();
		}else{
			this.toastr.warning(
				'The game is already running!', 
				'Running', 
				{
					positionClass: 'toast-top-center',
					titleClass: 'custom-toast-title',
					timeOut: 2000,
				}
			);
		}
	}
  
	public updateClickedNote(note: Note){
	  this.gameMechanics.updateSingleNote(note.coordinates, !note.alive);
	}

	public resetData(){
		this.data = this.gameMechanics.generateNotesData();
		GameMechanicsService.running = false;
	}
}
