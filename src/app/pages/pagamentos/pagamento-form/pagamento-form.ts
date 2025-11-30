import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatNativeDateModule } from '@angular/material/core';

import { Cliente } from '../../../model/cliente-entity';
import { Venda } from '../../../model/venda-entity';
import { Pagamento } from '../../../model/pagamento-entity';
import { ClienteService } from '../../../service/cliente-service';
import { VendaService } from '../../../service/venda-service';
import { PagamentoService } from '../../../service/pagamento-service';

@Component({
  selector: 'app-pagamento-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    CurrencyMaskModule
  ],
  templateUrl: './pagamento-form.html',
  styleUrl: './pagamento-form.css'
})
export class PagamentoForm implements OnInit {

  private formBuilder = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private vendaService = inject(VendaService);
  private pagamentoService = inject(PagamentoService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  clientes: Cliente[] = [];
  vendas: Venda[] = [];
  vendasFiltradas: Venda[] = [];
  pagamentosList: Pagamento[] = [];

  pagamentoId = this.route.snapshot.params['id'];
  isEditMode: boolean = false;
  clienteSelecionado: boolean = false;

  displayedColumns: string[] = ['id', 'cliente', 'venda', 'valor', 'descricao', 'dataPagamento', 'actions'];
  dataSource = new MatTableDataSource(this.pagamentosList);

  pagamentoForm = this.formBuilder.group({
    cliente: [null as number | null, [Validators.required]],
    venda: [{value: null as number | null, disabled: true}, [Validators.required]],
    valor: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    dataPagamento: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.onLoadClientes();
    this.onLoadVendas();
    this.onLoadPagamentos();

    if (this.pagamentoId) {
      this.onEdit(this.pagamentoId);
    }
  }

  onClienteChange(event: MatSelectChange): void {
    const clienteId = event.value;

    if (clienteId) {
      this.clienteSelecionado = true;
      this.pagamentoForm.get('venda')?.enable();
      this.vendasFiltradas = this.vendas.filter(venda => venda.cliente === clienteId);
      this.pagamentoForm.get('venda')?.reset();
    } else {
      this.clienteSelecionado = false;
      this.pagamentoForm.get('venda')?.disable();
      this.vendasFiltradas = [];
    }
  }

  onSubmit(): void {
    if (this.pagamentoForm.invalid) return;

    let formData = this.pagamentoForm.getRawValue();

    if (this.pagamentoId) {
      this.pagamentoService.editPagamento(this.pagamentoId, formData).subscribe({
        next: () => {
          this.snackBar.open('Pagamento atualizado com sucesso!!!', '', {
            duration: 4000
          });
          this.router.navigate(['/pagamentos']);
        },
        error: (error) => {
          console.error('Erro ao atualizar pagamento:', error);
          const mensagem = error?.error?.message || 'Não foi possível atualizar o pagamento. Verifique a conexão com o servidor.';
          this.snackBar.open(mensagem, 'Fechar', {
            duration: 5000
          });
        }
      });
    } else {
      this.pagamentoService.createPagamento(formData).subscribe({
        next: () => {
          this.snackBar.open('Pagamento registrado com sucesso!!!', '', {
            duration: 4000
          });
          this.onReloadPage();
        },
        error: (error) => {
          console.error('Erro ao registrar pagamento:', error);
          const mensagem = error?.error?.message || 'Não foi possível registrar o pagamento. Verifique a conexão com o servidor.';
          this.snackBar.open(mensagem, 'Fechar', {
            duration: 5000
          });
        }
      });
    }
  }

  onEdit(id: number): void {
    this.pagamentoService.getPagamentoById(id).subscribe({
      next: (response) => {
        this.isEditMode = true;
        this.clienteSelecionado = true;
        this.pagamentoForm.get('venda')?.enable();

        this.vendasFiltradas = this.vendas.filter(venda => venda.cliente === response.cliente);

        this.pagamentoForm.patchValue({
          cliente: response.cliente,
          venda: response.venda,
          valor: response.valor,
          descricao: response.descricao,
          dataPagamento: response.dataPagamento.toString()
        });
      },
      error: (error) => {
        console.error('Erro ao carregar o pagamento:', error);
      }
    });
  }

  onDelete(id: number): void {
    this.pagamentoService.deletePagamento(id).subscribe({
      next: () => {
        this.snackBar.open('Pagamento excluído com sucesso!!!', '', {
          duration: 4000
        });
        this.onReloadPage();
      },
      error: (error) => {
        console.error('Erro ao excluir o pagamento:', error);
        this.snackBar.open('Não foi possível excluir o pagamento.', 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  onLoadClientes(): void {
    this.clienteService.getAllCliente().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  onLoadVendas(): void {
    this.vendaService.getAllVenda().subscribe({
      next: (response) => {
        this.vendas = response;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas:', error);
      }
    });
  }

  onLoadPagamentos(): void {
    this.pagamentoService.getAllPagamento().subscribe({
      next: (response) => {
        this.pagamentosList = response;
        this.dataSource = new MatTableDataSource(this.pagamentosList);
      },
      error: (error) => {
        console.error('Erro ao carregar pagamentos:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClearForm(): void {
    this.pagamentoForm.reset();
    this.clienteSelecionado = false;
    this.pagamentoForm.get('venda')?.disable();
    this.vendasFiltradas = [];
  }

  onReloadPage(): void {
    window.location.reload();
  }
}
