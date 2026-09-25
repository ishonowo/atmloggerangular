import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchWithName } from 'src/app/model/branchWithName';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'app-up-display-branch',
  templateUrl: './up-display-branch.component.html',
  styleUrls: ['./up-display-branch.component.css']
})
export class UpDisplayBranchComponent implements OnInit {
  
  branches: BranchWithName[] = [];
  loading: boolean = true;
  error: string = '';
  selectedBranch: BranchWithName | null = null;

  constructor(
    private branchService: BranchService,
    protected router: Router
  ) {}

  ngOnInit(){
    this.loadBranchesWithNames();
  }


  loadBranchesWithNames(): void {
    this.loading = true;
    this.branchService.findAllBranchesWithNames().subscribe({
      next: (data) => {
        this.branches = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading terminals with names';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all branches with names.');
        //this.loadBranchesWithNames();
      },
    });
  }

  onSelect(branch: BranchWithName): void {
    this.selectedBranch = branch;
  }

  async onUpdateComplete(): Promise<void> {
    this.loadBranchesWithNames();
    this.selectedBranch = null; // Close the form
    await this.router.navigate(['/update-branch']);
    console.log('Update complete and terminals refreshed');
  }
} 
