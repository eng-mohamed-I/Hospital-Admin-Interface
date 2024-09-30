import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit {
  appointmentId: string | null = '';
  reports: any[] = [];
  appointment: any;
  constructor(
    private _router: ActivatedRoute,
    private _reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.appointmentId = this._router.snapshot.paramMap.get('id');
    if (this.appointmentId) {
      this.loadReports();
    }
  }

  loadReports() {
    this._reportService.getAppointmentRrports(this.appointmentId).subscribe(
      (res) => {
        this.reports = res.reports;
        console.log(res.reports)
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
