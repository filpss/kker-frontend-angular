import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
