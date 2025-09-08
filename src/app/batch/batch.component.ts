import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Execution } from './model/execution';
import { Step } from './model/step';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-batch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})
export class BatchComponent {
  jobs: string[] = [];
  executions: Execution[] = [];
  selectedJob: string | null = null;
  showDetails: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<string[]>(environment.apiBaseUrl+ '/jobs').subscribe((data) => {
      this.jobs = data;
    });
  }

  viewExecutions(jobName: string): void {
    this.selectedJob = jobName;
    this.http.get<Execution[]>(environment.apiBaseUrl+ `/jobs/${jobName}/executions`).subscribe((data) => {
      this.executions = data.map((execution) => {
        var exec = new Execution(execution.job_execution_id, execution.status, execution.start_time, execution.end_time, execution.stepDetails);
        exec.totalTime = (execution.end_time.getTime() - execution.start_time.getTime()) / 1000;
        return exec;
      });
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
        this.http.get<Step[]>(environment.apiBaseUrl+ `/executions/${executionId}/steps`).subscribe((data) => {
          execution.stepDetails = data;
        });
      }
    }
  }

  showFullMessage(message: string): void {
    alert(`Full Exit Message:\n\n${message}`);
  }
}