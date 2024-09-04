import { Component, Input, SimpleChanges } from '@angular/core';
import { Note } from './note.interface';
import { GameMechanicsService } from '../../services/game-mechanics.service';
import { GridIndex } from '../table/grid-index.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})

export class NoteComponent {
	@Input({ required: true }) data!: Note;

	public id: number = 0;
	public alive: boolean = false;
	public size: number = 35;
	public connections: GridIndex[] = [];
  
	constructor(
		private gameMechanics: GameMechanicsService
	){}

	ngOnChanges(changes: SimpleChanges): void {
	  	if (changes['data'] && this.data) {
			this.id = this.data.id;
			this.alive = this.data.alive;
	  	}

		if(this.alive){}
	}	

	public generatConnections(connection: GridIndex){
		let lenght = 0;
		let rotation = 0;
	}
}
