import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})

export class StudentsDataService {
  public api_students_url: string;

  constructor(private httpClient: HttpClient) {
    this.api_students_url = 'http://localhost:3000/estudiantes';
  }

  getStudents() {
    return this.httpClient.get(this.api_students_url);
  }

  removeStudent(id: string) {
    return this.httpClient.delete(`${this.api_students_url}/${id}`);
  }

  updateStudent(id: string, student: Student) {
    return this.httpClient.put(`${this.api_students_url}/${id}`, student);
  }

  createStudent(student: Student) {
    return this.httpClient.post(this.api_students_url, student);
  }
}
