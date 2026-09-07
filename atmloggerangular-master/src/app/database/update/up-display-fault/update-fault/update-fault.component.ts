import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmFault } from 'src/app/model/atmfault';
import { AtmFaultService } from 'src/app/shared/atm-fault.service';

@Component({
  selector: 'app-update-fault',
  templateUrl: './update-fault.component.html',
  styleUrls: ['./update-fault.component.css']
})
export class UpdateFaultComponent implements OnInit, OnChanges{
  @Input() fault!: AtmFault;
  @Output() updateComplete= new EventEmitter<void>();
  @Output() closeForm= new EventEmitter<void>();

  faultForm: FormGroup;
  protected loading: boolean=false;
  protected error: String='';
  protected success: String='';

  constructor( private fb: FormBuilder, private faultService: AtmFaultService){
    this.faultForm=this.createFrom();
  }

  ngOnInit(): void{
    if (this.fault){
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['fault'] && this.fault){
      this.populateForm();
    }
  }

  createFrom(): FormGroup{
    return this.fb.group({
      id:[''],
      natureOfFault:['',[Validators.required,Validators.minLength(5)]],
      description:['',[Validators.required,Validators.minLength(5)]],
      faultType:['',[Validators.required,Validators.minLength(5)]]
    });
  }

  populateForm():void{
    this.faultForm.patchValue({
      id:this.fault.id,
      natureOfFault:this.fault.natureOfFault,
      description:this.fault.description,
      faultType:this.fault.faultType
    });
  }

  onSubmit(): void{
    if(this.faultForm.valid){
      this.loading=true;
      this.error='';
      this.success='';

      const updateFault: AtmFault={
        id: this.faultForm.get('id')?.value,
        natureOfFault: this.faultForm.get('natureOfFault')?.value,
        description: this.faultForm.get('description')?.value,
        faultType: this.faultForm.get('faultType')?.value
      };

      this.faultService.updateFault(updateFault).subscribe({
        next: ()=>{
          this.success='ATM fault updated successfully';
          this.loading= false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) =>{
          this.error='Error updating ATM fault';
          this.loading=false;
          console.error('Error:',error);
        }
      })
    }
  }

}
