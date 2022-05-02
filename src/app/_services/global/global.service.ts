import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor(public toastController: ToastController, public alertController: AlertController) { }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  isAuth() {
    return window.localStorage.getItem("user") ? true : false
  }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      message: `Etes vous sur de vouloir supprimer l'employer ?`,
      buttons: ['Cancel', 'Delete']
    });

    await alert.present();
  }
}
