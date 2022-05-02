import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { GlobalService } from 'src/app/_services/global/global.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  employee: Employee = new Employee();
  @Input() isUpdate: string;
  constructor(private employeeService: EmployeeService, private globalService: GlobalService, private router: Router, private modalController: ModalController) {

  }

  ngOnInit() {
    console.log(this.isUpdate)
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addEmployee() {
    console.log(this.employee)
    this.employeeService.add(this.employee).subscribe((result: any) => {
      console.log(result)
      if (result.id) {
        this.modalController.dismiss({
          'dismissed': true,
          "employee": this.employee
        });
      }
    })
  }
  updateEmployee() {
    delete this.employee['isColored']
    this.employeeService.update(this.employee).subscribe(result => {
      this.globalService.changeMessage('')
      this.globalService.presentToast("Employer mis a jour")
      this.dismiss()

    })
  }

}
