import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { Cliente } from '../../../../model/cliente-entity';
import { Venda } from '../../../../model/venda-entity';
import { ClienteService } from '../../../../service/cliente-service';
import { VendaService } from '../../../../service/venda-service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-venda-form',
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    CurrencyMaskModule,
    MatIconModule
],
  templateUrl: './venda-form.html',
  styleUrl: './venda-form.css'
})
export class VendaForm implements OnInit {

  private formBuilder = inject(FormBuilder);
  private vendaService = inject(VendaService);
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vendasList: Venda[] = [];
  clientes: Cliente[] = [];
  vendaId = this.route.snapshot.params['id'];

  isEditMode: boolean = false

  displayedColumns: string[] = ['id', 'cliente', 'valor', 'descricao', 'dataVenda', 'actions'];
  dataSource = new MatTableDataSource(this.vendasList);

  vendaForm = this.formBuilder.group({
    cliente: [null, [Validators.required]],
    valor: ['', [Validators.required]],
    dataVenda: ['', Validators.required],
    descricao: ['', Validators.required]
  });

  ngOnInit(){
    this.onLoadClientes();
    this.onLoadVenda();
  }

  onSubmit(){
    let formData = this.vendaForm.value;
    let id_venda = this.vendaId;

    if(id_venda){
      this.vendaService.editVenda(id_venda, formData).subscribe({
        next: () => {
          this.snackBar.open('Venda atualizada com sucesso!!!', '', {
            duration: 4000
          })
          this.router.navigate(['/vendas']);
        },
        error: (error) => {
          alert("Não foi possível atualizar a venda" + error);
        }
      });
    } else {
      this.vendaService.createVenda(formData).subscribe({
        next: () => {
          this.snackBar.open('Venda registrada com sucesso!!!', '', {
            duration: 4000
          })
          this.onReloadPage();
        },
        error: (error) => {
          alert("Não foi possível realizar o registro da venda" + error);
        }
      });
      this.router.navigate(['/vendas']);
    }
  }

  onEdit(id: number): void{
    this.vendaService.getVendaById(id).subscribe({
      next: (response) => {
        this.isEditMode = true;
        this.vendaForm.patchValue({
          cliente: response.cliente,
          dataVenda: response.dataVenda.toString(),
          valor: response.valor,
          descricao: response.descricao
        })
      },
      error: (error) => {
        console.warn("Erro ao carregar a venda", error);
      }
    })
  }

  onDelete(id: number){
    this.vendaService.deleteVenda(id).subscribe({
      next: () => {
        this.snackBar.open('Venda deletada com sucesso', '', {
          duration: 4000
        });
        this.router.navigate(['/vendas']);
      },
      error: (error) => {
        console.warn("Erro ao deletar a vanda" + error);
      }
    })
  }

  onLoadClientes(){
    this.clienteService.getAllCliente().subscribe((response) => {
      this.clientes = response;
    });
  }

  onLoadVenda(){
    this.vendaService.getAllVenda().subscribe({
      next: (response) => {
        this.vendasList = response;
        this.dataSource = new MatTableDataSource(this.vendasList);
      }
    })
  }

  applyFilter(event: Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClearForm(): void{
    this.vendaForm.reset();
  }

  onReloadPage(): void{
    window.location.reload();
  }
}
