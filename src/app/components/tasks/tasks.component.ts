import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service"
import { Task } from "../../Task"

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []

  //bringing the service as a provider
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //fires of on init, so that's when we want to use the service to get the tasks.
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks) //since it is an observable, we subscribe and get something from it, it is kinda like a promisse
  }
}
