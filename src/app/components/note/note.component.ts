import { Component, Input, SimpleChanges } from '@angular/core';
import { Note } from './note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})

export class NoteComponent {
	@Input({ required: true }) data!: Note;

	public id: number = 0;
	public alive: boolean = false;
	public size: number = 30;
  
	ngOnChanges(changes: SimpleChanges): void {
	  if (changes['data'] && this.data) {
		this.id = this.data.id;
		this.alive = this.data.alive;
	  }
	}
}
