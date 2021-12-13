import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseApi } from './models/responseApi.model';
import { Student } from './models/student.model';
import { StudentsDataService } from './students-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public changeFormValues: Subject<Student>;

  public students: Student[];
  public editableStudent: Student;
  
  constructor(private studentData: StudentsDataService) {
    this.changeFormValues = new Subject();
  }

  ngOnInit() {
    this.getStudents();
  }

  createStudent(student: Student) {
    if (student._id == '') {
      let newStudent = <Student> {
        name: student.name, 
        location: student.location, 
        fp: student.fp, 
        average_grade: student.average_grade, 
        scholarship: student.scholarship
      };
      this.studentData.createStudent(newStudent)
      .subscribe(response => {
        console.log(response);
        this.getStudents();
      });
    }
    else {
      let confirmUpdate = confirm('Quiere confirmar la actualización del estudiante ' + student.name + '?');
      if (confirmUpdate) {
        this.studentData.updateStudent(student._id, student)
        .subscribe(response => {
          console.log(response);
          this.getStudents();
        });
      }
    }
  }

  getStudents() {
    let obs = <Observable<ResponseApi>> this.studentData.getStudents();
    obs.subscribe(response => {
      this.students = response.students;
    });
  }

  deleteStudent(student: Student) {
    let confirmDelete = confirm('Estás seguro que quieres eliminar a ' + student.name + '?');
    if (confirmDelete) {
      this.studentData.removeStudent(student._id)
      .subscribe(response => {
        console.log(response);
        this.getStudents();
      });
    }
  }

  studentToEdit(student: Student) {
    this.changeFormValues.next(student);
  }

  getStudentToEdit() {
    return this.changeFormValues.asObservable();
  }
}
