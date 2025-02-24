import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TerminalWithName } from 'src/app/model/terminalWithName';
import { TerminalService } from 'src/app/shared/terminal.service';

@Component({
  selector: 'app-update-terminal',
  templateUrl: './update-terminal.component.html',
  styleUrls: ['./update-terminal.component.css'],
})
export class UpdateTerminalComponent implements OnInit, OnChanges {
  @Input() terminal!: TerminalWithName;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>(); // Add this new event emitter

  terminalForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private terminalService: TerminalService
  ) {
    this.terminalForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.terminal) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['terminal'] && this.terminal) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      vendorId: ['', [Validators.required]],
      terminalId: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      atmName: ['', [Validators.required, Validators.minLength(5)]],
      offsite: ['False', [Validators.required]],
    });
  }

  populateForm(): void {
    this.terminalForm.patchValue({
      id: this.terminal.id,
      vendorId: this.terminal.vendorId,
      terminalId: this.terminal.terminalId,
      atmName: this.terminal.atmName,
      offsite: this.terminal.offsite,
      vendorName: this.terminal.vendorName
    });
  }

  onSubmit(): void {
    if (this.terminalForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedTerminal: TerminalWithName = {
        id: this.terminalForm.get('id')?.value,
        vendorId: this.terminalForm.get('vendorId')?.value,
        vendorName: this.terminalForm.get('vendorName')?.value,
        terminalId: this.terminalForm.get('terminalId')?.value,
        atmName: this.terminalForm.get('atmName')?.value,
        offsite: this.terminalForm.get('offsite')?.value,
      };

      this.terminalService.updateTerminal(updatedTerminal).subscribe({
        next: () => {
          this.success = 'Terminal updated successfully';
          this.loading = false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) => {
          this.error = 'Error updating terminal';
          this.loading = false;
          console.error('Error:', error);
        },
      });
    }
  }
}

