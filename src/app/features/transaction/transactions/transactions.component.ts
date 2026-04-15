import { Component, inject, OnInit } from '@angular/core';
import { TabelComponent } from '../../../shared/components/tabel/tabel.component';
import { Transaction } from '../../../core/models/seller';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactions',
  imports: [TabelComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  tranService = inject(TransactionService);

  columns = [
    { key: 'id', label: 'Id', hidden: true },
    { key: 'transactionNumber', label: 'Transaction Number' },
    { key: 'amount', label: 'Amount' }
  ];
  data: Transaction[] = [
    { id: 1, transactionNumber: '123', amount: 100 },
    { id: 2, transactionNumber: '456', amount: 200 },
    { id: 3, transactionNumber: '789', amount: 300 },
  ];
  ngOnInit(): void {
    // this.loadTransactions();
  }

  loadTransactions() {
    this.tranService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.data = transactions.data;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }
}
