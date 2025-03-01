import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    private baseUrl = 'http://localhost:8081/ecommerce/clientes';

    constructor(private http: HttpClient) { }

    salvar(cliente: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}/salvar`, cliente);
    }
    
}
