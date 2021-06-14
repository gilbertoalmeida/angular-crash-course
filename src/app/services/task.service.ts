import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs"
import { TASKS } from "../mock-tasks"
import { Task } from "../Task"

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS) //need to use of because it is an observable
    return tasks
  }
}
