import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'usuario.component.html'})
export class UsuarioComponent implements OnInit {
    usuarioBuscaForm: FormGroup;
    usuarioCadastroForm: FormGroup;
    loading = false;
    submitted = false;
    showCreateComponent:boolean = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.usuarioBuscaForm = this.formBuilder.group({
            cpfBusca: [''],
            nomeBusca: [''],
            emailBusca: [''],
        });
        this.usuarioCadastroForm = this.formBuilder.group({
            cpf: ['', Validators.required],
            nome: ['', Validators.required],
            codigoIntegracao: ['', Validators.required],
            telefone: ['', Validators.required],
            ramal: ['', Validators.required],
            celular: ['', Validators.required],
            email: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.usuarioCadastroForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.usuarioCadastroForm.invalid) {
            return;
        }

        this.loading = true;

        console.log([this.returnUrl]);

        this.router.navigate([this.returnUrl]);
        // this.authenticationService.login(this.f.usuario.value, this.f.usuario.value, this.f.senha.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }

    onCreateUser() {
        if (this.showCreateComponent) {
            this.showCreateComponent = false;
        } else {
            this.showCreateComponent = true;
        }
    }
}
