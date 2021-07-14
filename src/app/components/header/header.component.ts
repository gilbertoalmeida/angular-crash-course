import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask!: boolean
  subscription: Subscription

  constructor(private uiService: UiService, private router: Router) {
    //I could have made the local showAddTask change in the local toggleAddTask, all inside this class alone
    //However, I want the same variable to influence the button AND the form itself.
    //That's why we made it all in a Service and we are subscribing to the variable
    //everytime this.toggleAddTask fires, the toggleAddTask of the uiService will fire
    //toggle the variable in the service and send it over a subject
    //which we are subscribing here, can catch as value and make the local showAddTask equal to it.s
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }

  hasRoute(route: string) {
    return this.router.url === route
  }
}
