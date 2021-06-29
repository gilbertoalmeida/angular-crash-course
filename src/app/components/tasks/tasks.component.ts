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

  deleteTask(task: Task) {
    //deleteTask deletes the task passed from the db file through the server. And we are then "manually" removing this same task from this.task to remove it from the UI without having to update the page. The subscribe is working as a .then
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id !== task.id))
  }

  toggleReminder(task: Task) {
    this.taskService.toggleReminder(task).subscribe(() => task.reminder = !task.reminder)
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task))
  }
}
