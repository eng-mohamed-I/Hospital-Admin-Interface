import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css'
})
export class EarningsComponent {
 // Sample earnings data (you can fetch this from an API)
 earningsData = [
  { month: 'January', amount: 10000 },
  { month: 'February', amount: 12000 },
  { month: 'March', amount: 9000 },
  { month: 'April', amount: 15000 },
];

totalEarnings = this.earningsData.reduce((sum, item) => sum + item.amount, 0);
}
