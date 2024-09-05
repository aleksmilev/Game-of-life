import { Component, Input, SimpleChanges } from '@angular/core';
import { CellConnectionSettings } from './cell-connection';
import { GameMechanicsService } from '../services/game-mechanics.service';

@Component({
    selector: 'app-cell-connection',
    templateUrl: './cell-connection.component.html',
    styleUrl: './cell-connection.component.css'
})

export class CellConnectionComponent {
    @Input({ required: true }) settings!: CellConnectionSettings;

    public extended: number = 0;
    public size: number = GameMechanicsService.noteSize;
    public rotation: number = 0; 

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['settings'] && this.settings) {
            this.extended = this.settings.width;
            this.rotation = this.settings.rotation;
        }
    }	
}
