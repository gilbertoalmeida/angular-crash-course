import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, /* of */ } from "rxjs"
// import { TASKS } from "../mock-tasks"
import { Task } from "../Task"

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks"

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    // this is importing the tasks as an observale from the local mock file
    // const tasks = of(TASKS) //need to use of because it is an observable
    // return tasks

    //this is importing the tasks as an observable from our local server from json-server. Database is db.json at the root. It's a mock server, it will do the CRUD operations in this local file database
    return this.http.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task>(url)
  }
}
