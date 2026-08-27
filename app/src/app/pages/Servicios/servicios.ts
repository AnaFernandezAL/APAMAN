import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,   
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class servicios {}
