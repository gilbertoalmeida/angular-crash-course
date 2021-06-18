import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, /* of */ } from "rxjs"
// import { TASKS } from "../mock-tasks"
import { Task } from "../Task"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

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

  toggleReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    const { id, text, day, reminder } = task
    //I am creating a new object, because I don't want to change task if the server doesn't work. I am only changing task on the subscribe in the task component. So it happens only to update the ui and only if the server has worked
    let toggledTask = {
      id,
      text,
      day,
      reminder: !reminder
    }
    return this.http.put<Task>(url, toggledTask, httpOptions)
  }
}
