import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
	AppComponent,
    TableComponent
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
