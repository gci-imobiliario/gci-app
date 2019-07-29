import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class LoginComponent implements OnInit {
  
  username: string;
  password: string;

  constructor(
    private router: Router) 
    { }
  
  ngOnInit() {

  }

  login(): void {

    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["user"]);
    } else {
      alert("Invalid credentials");
    }
  }
}
