import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentsDataService } from '../students-data.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnInit {
  @Input() changeFormValues: Observable<Student>;
  @Output() newStudent: EventEmitter<Student>;
  
  public form: FormGroup;
  public _id: AbstractControl;
  public name: AbstractControl;
  public location: AbstractControl;
  public fp: AbstractControl;
  public average_grade: AbstractControl;
  public scholarship: AbstractControl;
  public isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.newStudent = new EventEmitter();

    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      fp: ['', Validators.compose([Validators.required])],
      average_grade: [0, Validators.compose([Validators.required])],
      scholarship: [false, Validators.compose([Validators.required])]
    });

    this._id = this.form.controls._id;
    this.name = this.form.controls.name;
    this.location = this.form.controls.location;
    this.fp = this.form.controls.fp;
    this.average_grade = this.form.controls.average_grade;
    this.scholarship = this.form.controls.scholarship;

    this.isSubmitted = false;
  }

  ngOnInit(): void {
    this.changeFormValues
    .subscribe(student => {
      this._id.setValue(student._id);
      this.name.setValue(student.name);
      this.location.setValue(student.location);
      this.fp.setValue(student.fp);
      this.average_grade.setValue(student.average_grade);
      this.scholarship.setValue(student.scholarship);
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    let isValid = this.form.valid;
    if (isValid) {
      this.isSubmitted = false;
      let newStudent = <Student> this.form.value;
      this.newStudent.emit(newStudent);
    }
  }

  cleanForm() {
    this._id.setValue('');
    this.name.setValue('');
    this.location.setValue('');
    this.fp.setValue('');
    this.average_grade.setValue(0);
    this.scholarship.setValue(false);
  }

}
