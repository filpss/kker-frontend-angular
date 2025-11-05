import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

import { StatusCliente } from './../../shared/enums/StatusCliente';
import { trimmedRequiredValidator } from '../../shared/validators/trimmedRequiredValidator';




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
              MatSelectModule,
              NgxMaskDirective
            ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {

  statusCliente = StatusCliente;
  statusClienteList = Object.values(this.statusCliente);

  private FormBuilder = inject(FormBuilder);

  clienteForm = this.FormBuilder.group({
    nome: ['', [Validators.required, trimmedRequiredValidator]],
    telefone: ['', [
                    Validators.required,
                    Validators.minLength(11)]],
    isAtivo: [StatusCliente.ATIVO],
    dataCobranca: ['']
  });

  public get nome() {
    return this.clienteForm.get('nome');
  }


  public get telefone() {
    return this.clienteForm.get('telefone');
  }

  public get isAtivo(){
    return this.clienteForm.get('isAtivo');
  }

  public get dataCobranca(){
    return this.clienteForm.get('dataCobranca');
  }

  onSubmit(){
    console.warn(this.clienteForm.value);
  }

  onClearForm(){
    this.clienteForm.reset({
      isAtivo: StatusCliente.ATIVO
    });
  }
}
