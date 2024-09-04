import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../note/note.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
	@Input({ required: true }) data: Note[][] = [];
	@Output() noteClickEvent: EventEmitter<Note> = new EventEmitter<Note>();

	ngOnInit(): void {}

	public noteClickEmit(note: Note) {
		this.noteClickEvent.emit(note);
	}
}
