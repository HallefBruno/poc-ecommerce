import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from './pessoa.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    salvando = true;
    
    constructor(private fb: FormBuilder, private pessoaService: PessoaService, private router: Router) { }

    ngOnInit() {
        this.form = this.fb.group({
            nome: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.salvando = false;
        if (this.form.valid) {
            let cliente = { 'nome': this.form.get('nome').value };
            this.pessoaService.salvar(cliente).subscribe(data => {
                console.log(data)
                this.submitted = false;
                this.salvando = true;
                this.messageSucces('Registro salvo com sucesso!');
            }, error => {
                this.submitted = false;
                this.salvando = true;
                console.log(error);
                if(error && error.error) {
                    Swal.fire({
                        icon: 'warning',
                        title: error.error.messageUser
                    });
                }
            });
        }
    }
    messageSucces(message:string) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'success',
            title: `${message}`
        });
    }
}
