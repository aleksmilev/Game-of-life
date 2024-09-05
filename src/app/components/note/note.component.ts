import { Component, Input, SimpleChanges } from '@angular/core';
import { Note } from './note.interface';
import { GridIndex } from '../table/grid-index.interface';
import { CellConnection, CellConnectionManiger } from '../../cell-connection/cell-connection';

@Component({
  	selector: 'app-note',
  	templateUrl: './note.component.html',
  	styleUrl: './note.component.css'
})

export class NoteComponent {
	@Input({ required: true }) data!: Note;

	public id: number = 0;
	public alive: boolean = false;
	public size: number = 0;
	public coordinates: GridIndex = { x: 0, y: 0 }

	public connections: CellConnection[] = [];
  
	constructor(){}

	ngOnChanges(changes: SimpleChanges): void {
	  	if (changes['data'] && this.data) {
			this.id = this.data.id;
			this.alive = this.data.alive;
			this.size = this.data.size;
			this.coordinates = this.data.coordinates;
	  	}

		if (this.alive) {
			this.connections = CellConnectionManiger.getConnections(this.coordinates);				
		}
	}	

	public generatConnections(cellConnection: CellConnection){
		return CellConnectionManiger.generateSettings(cellConnection, this.data)
	}
}
