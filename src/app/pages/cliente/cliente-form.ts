import { Cliente } from './../../model/Cliente.entity';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { ClienteService } from '../../service/cliente-service';




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

  private clienteService = inject(ClienteService);

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
    const formData = this.clienteForm.value;
    this.clienteService.createCustomer(formData).subscribe(response => {
      alert('Cliente cadastrado com sucesso!!!');
    });
  }

  onClearForm(){
    this.clienteForm.reset({
      isAtivo: StatusCliente.ATIVO
    });
  }
}
