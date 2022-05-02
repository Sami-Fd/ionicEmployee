import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee/employee.service';
import { GlobalService } from '../_services/global/global.service';
import { ModalPageComponent } from './modal-page/modal-page.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  employees: Employee[] = [];
  employee: Employee = new Employee();
  isSelected: boolean = false;

  constructor(private globalService: GlobalService, private employeeService: EmployeeService, public modalController: ModalController, private alertController: AlertController) {
    this.globalService.currentMessage.subscribe(message => {
      this.isSelected = false
    })
  }

  ngOnInit() {
    this.employeeService.getAll().subscribe(result => {
      this.employees = result
      console.log(result)


    })
  }
  actions(data: any) {
    console.log("ddddddddddd")
    this.employees.forEach(employee => {
      employee['isColored'] = false;
    })
    data.isColored = true;
    this.isSelected = true;
    this.employee = data
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Etes vous sur de vouloir supprimer ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'supprimer',
          id: 'confirm-button',
          handler: () => {
            this.delete()
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  delete() {
    this.employeeService.delete(this.employee.id).subscribe(data => {
      this.globalService.presentToast("Employer supprimer avec succes")
      this.employees = this.employees.filter(item => item.id != this.employee.id)
      this.isSelected = false
    })
  }
  async openModalUpdate() {

    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "employee": this.employee,
        "isUpdate": true,
      }
    });
    return await modal.present();
  }
  async openModalAdd() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        "isUpdate": false,
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);

      if (data.data.employee) {
        data.data.employee.id = this.employees.length + 1
        this.employees.push(data.data.employee)
      }
    })
    return await modal.present();
  }
}
