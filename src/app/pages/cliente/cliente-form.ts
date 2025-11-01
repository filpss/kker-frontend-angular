import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { StatusCliente } from './../../shared/enums/StatusCliente';




@Component({
  selector: 'app-cliente-form',
  imports: [  CommonModule,
              MatCardModule,
              MatFormFieldModule,
              MatInputModule,
              ReactiveFormsModule,
              MatIconModule,
              MatButtonModule,
              MatGridListModule,
              MatDatepickerModule,
              MatNativeDateModule,
              MatSelectModule
            ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {

  statusCliente = StatusCliente;
  statusClienteList = Object.values(this.statusCliente);

  private FormBuilder = inject(FormBuilder);

  clienteForm = this.FormBuilder.group({
    nome: [''],
    telefone: [''],
    isAtivo: [StatusCliente.ATIVO],
    dataCobranca: ['']
  });

  onSubmit(){
    console.warn(this.clienteForm.value);
  }
}
