import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'usuario.component.html'})
export class UsuarioComponent implements OnInit {
    usuarioBuscaForm: FormGroup;
    loading = false;
    submitted = false;
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
            cpfBusca: ['', Validators.required],
            nomeBusca: ['', Validators.required],
            emailBusca: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.usuarioBuscaForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.usuarioBuscaForm.invalid) {
            return;
        }

        // this.loading = true;

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
}
