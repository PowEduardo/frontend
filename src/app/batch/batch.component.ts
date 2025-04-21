import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-batch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent {
  jobs: string[] = [];
  executions: any[] = [];
  selectedJob: string | null = null;
  showDetails: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<string[]>('http://localhost:8080/jobs').subscribe((data) => {
      this.jobs = data;
    });
  }

  viewExecutions(jobName: string): void {
    this.selectedJob = jobName;
    this.http.get<any[]>(`http://localhost:8080/jobs/${jobName}/executions`).subscribe((data) => {
      this.executions = data.map((execution) => ({
        ...execution,
        stepDetails: [] // Initialize step details
      }));
    });
  }

  toggleDetails(executionId: number): void {
    if (this.showDetails === executionId) {
      this.showDetails = null; // Hide details
    } else {
      this.showDetails = executionId; // Show details
      const execution = this.executions.find((e) => e.job_execution_id === executionId);
      if (execution && execution.stepDetails.length === 0) {
        // Fetch step details if not already loaded
        this.http.get<any[]>(`http://localhost:8080/executions/${executionId}/steps`).subscribe((data) => {
          execution.stepDetails = data;
        });
      }
    }
  }

  showFullMessage(message: string): void {
    alert(`Full Exit Message:\n\n${message}`);
  }
}