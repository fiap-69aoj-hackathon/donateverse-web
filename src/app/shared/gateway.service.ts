import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../main/login/login.model';
import { User } from '../model/user.model';
import { Token } from 'app/main/login/token.model';
import { Donation } from 'app/model/donation.model';
import { State } from 'app/model/state.model';
import { DonationStatus } from 'app/model/donation.status.model';
import { DonationCenter } from 'app/model/donation-center.model';
import { AddressResponse } from 'app/model/address.response.model';

@Injectable()
export class GatewayService {
  url: string;
  urlDonationCenter: string;
  states: State[] = [
    new State('AC', 'Acre'),
    new State('AL', 'Alagoas'),
    new State('AP', 'Amapá'),
    new State('AM', 'Amazonas'),
    new State('BA', 'Bahia'),
    new State('CE', 'Ceará'),
    new State('DF', 'Distrito Federal'),
    new State('ES', 'Espírito Santo'),
    new State('GO', 'Goiás'),
    new State('MA', 'Maranhão'),
    new State('MT', 'Mato Grosso'),
    new State('MS', 'Mato Grosso do Sul'),
    new State('MG', 'Minas Gerais'),
    new State('PA', 'Pará'),
    new State('PB', 'Paraíba'),
    new State('PR', 'Paraná'),
    new State('PE', 'Pernambuco'),
    new State('PI', 'Piauí'),
    new State('RJ', 'Rio de Janeiro'),
    new State('RN', 'Rio Grande do Norte'),
    new State('RS', 'Rio Grande do Sul'),
    new State('RO', 'Rondônia'),
    new State('RR', 'Roraima'),
    new State('SC', 'Santa Catarina'),
    new State('SP', 'São Paulo'),
    new State('SE', 'Sergipe'),
    new State('TO', 'Tocantins')
  ];

  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:9091';
    // this.urlDonationCenter = 'http://localhost:3012';

    this.url = 'http://18.230.37.8:9091';
    this.urlDonationCenter = 'http://18.230.37.8:3012';

    // this.url = 'http://donateverse-api.sa-east-1.elasticbeanstalk.com'

  }

  // ######################### AUTYH #########################

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, login);
  }

  // ######################### USER #########################

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user/users`, user);
  }

  getUser(token: string) {
    return this.http.get<User>(`${this.url}/user/users/me`, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

  getUserById(token: string, idUser: number): Promise<User> {
    return this.http.get<User>(`${this.url}/user/users/${idUser}`, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    }).toPromise();
  }  

  // ######################### DONATION #########################

  createDonation(donation: Donation, token: string): Observable<Donation> {
    return this.http.post<Donation>(`${this.urlDonationCenter}/DonationCenter`, donation, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

  getDonations(token: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.url}/donation/transactions`, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

  getDonationById(token: string, id: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.url}/donation/transactions/${id}`, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

  updateStatus(id: number, status: DonationStatus, token: string): Observable<Donation> {
    return this.http.put<Donation>(`${this.url}/donation/transactions/${id}`, status, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

  // ######################### DONATION CENTER #########################

  createDonationCenter(donationCenter: DonationCenter) {
    return this.http.post<any>(`${this.urlDonationCenter}/DonationCenter`, donationCenter);
  }

  listDonationCenter(): Observable<DonationCenter[]> {
    return this.http.get<DonationCenter[]>(`${this.urlDonationCenter}/DonationCenter`);
  }

  getDonationCenterById(id: number): Observable<DonationCenter> {
    return this.http.get<DonationCenter>(`${this.urlDonationCenter}/DonationCenter/${id}`);
  }

  // ######################### OUTROS #########################

  getStates(): State[] {
    return this.states;
  }

  getAddress(zipCode: string) {
    return this.http.get<AddressResponse>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }

}
