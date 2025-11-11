import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { StatusCliente } from '../../../shared/enums/StatusCliente';
import { trimmedRequiredValidator } from '../../../shared/validators/trimmedRequiredValidator';
import { ClienteService } from '../../../service/cliente-service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { PhonePipePipe } from '../../../shared/pipe/phone-pipe-pipe';
import { Cliente } from '../../../model/cliente.entity';


@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule,
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
    NgxMaskDirective,
    MatSnackBarModule,
    MatTableModule,
    RouterModule,
    PhonePipePipe
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})


export class ClienteForm implements OnInit{

  private clienteService = inject(ClienteService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @Input() inputCliente!: Cliente;

  statusCliente = StatusCliente;
  statusClienteList = Object.values(this.statusCliente);
  cliente: Cliente | undefined;
  clienteId = this.route.snapshot.params['id'];
  isEditMode: boolean = false;

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'isAtivo', 'dataCobranca', 'actions'];
  clienteList: Cliente[] = [];
  dataSource = new MatTableDataSource(this.clienteList);

  constructor(){}

  clienteForm = this.formBuilder.group({
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

  ngOnInit(): void{

    if(this.clienteId){
      this.onEdit(this.clienteId);
    }

    this.onLoadClientes();
  }

  onSubmit(){
    if(this.clienteForm.invalid) return;
    const formData = this.clienteForm.value;

    if(this.clienteId){
      this.clienteService.editCustomer(this.clienteId, formData).subscribe({
        next: (response) => {
          this.snackBar.open('Cliente atualizado com sucesso!!!', '', {
            duration: 4000
          });
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          alert('erro ao atualizar o cliente' + error);
        }
      });
    } else {
      this.clienteService.createCustomer(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Cliente cadastrado com sucesso!!!', '' , {
            duration: 4000
          });
          this.reloadPage();
        },
        error: (error) => {
          alert('Erro ao realizar o cadastro do cliente' + error);
        }
      });
    }
  }

  onEdit(id: any): void{
    let formData = this.clienteForm.value;
    this.clienteService.getCustomerById(id).subscribe({
      next: (response) => {
        this.isEditMode = true;
        formData = response;
        this.clienteForm.patchValue(formData);
      },
      error: (error) => {
        console.warn("Erro ao carregar o cliente", error);
      }
    });
  }

  onDelete(id: any){
    this.clienteService.deleteCustomer(id).subscribe({
      next: (response) => {
        this.snackBar.open('Cliente excluido com sucesso!!!', '', {
          duration: 4000
        });
        this.router.navigate(['/clientes']);
      },
      error: (error) => {
        alert('Erro ao deletar o cliente' + error);
      }
    });
  }

  onLoadClientes(){
    this.clienteService.getAllCustomer().subscribe({
      next: (response) => {
        this.clienteList = response;
        this.dataSource = new MatTableDataSource(this.clienteList);
      },
      error: (err) => {
        console.warn("Erro ao carregar clientes" + err);
      }
    });
  }

  onClearForm(){
    this.clienteForm.reset();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadPage(): void{
    window.location.reload();
  }

}
