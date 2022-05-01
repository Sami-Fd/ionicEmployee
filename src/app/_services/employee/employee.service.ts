import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(environment.AUTH_API + '/employees');
  }

  get(id: any): Observable<any> {
    return this.http.get(environment.AUTH_API + '/employees/' + id, httpOptions);
  }

  update(data: any): Observable<any> {
    return this.http.put(environment.AUTH_API + '/employees/' + data.id, data, httpOptions);
  }

  delete(data: any): Observable<any> {
    return this.http.delete(environment.AUTH_API + '/employees/' + data, httpOptions);
  }

  add(data: any): any {
    return this.http.post(environment.AUTH_API + '/employees', data);
  }
}
