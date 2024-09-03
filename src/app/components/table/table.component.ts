import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note/note.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
	@Input({ required: true }) data: Note[][] = [];

	ngOnInit(): void {
		console.log(this.data);
	}
}
