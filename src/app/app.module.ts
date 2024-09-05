import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from './components/table/table.component';
import { NoteComponent } from './components/note/note.component';
import { CellConnectionComponent } from './cell-connection/cell-connection.component';

@NgModule({
    declarations: [
	    AppComponent,
      	TableComponent,
    	NoteComponent,
		CellConnectionComponent
  	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,		
	],
	providers: [],
  	bootstrap: [AppComponent]
})

export class AppModule { }
