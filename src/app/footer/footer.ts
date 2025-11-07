import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})

export class Footer {

  // Obtenemos el año actual para mostrarlo en el copyright
  public anoActual: number = new Date().getFullYear();

}