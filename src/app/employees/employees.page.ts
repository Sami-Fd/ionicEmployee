import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAll().subscribe(result => {
      this.employees = result
      console.log(result)
    })
  }
  actions() {
    console.log("ddddddddddd")
  }

}
