import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.css']
})
export class TableStudentComponent implements OnInit {
  @Input() students: Student[];
  @Output() studentToEdit: EventEmitter<Student>;
  @Output() deleteStudent: EventEmitter<Student>;

  public editButtonPressed: boolean;

  constructor() {
    this.studentToEdit = new EventEmitter();
    this.deleteStudent = new EventEmitter();

    this.editButtonPressed = false;
  }

  ngOnInit(): void {
  }

  onEdit(student: Student) {
    this.studentToEdit.emit(student);
  }

  onDelete(student: Student) {
    this.deleteStudent.emit(student);
  }

}
