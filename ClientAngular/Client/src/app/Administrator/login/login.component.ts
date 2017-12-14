import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GLOBAL} from '../../services/global'
import {LoginService} from '../../services/login.service'
import {isNull, isUndefined} from "util";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

public user: any={username:'', password:''};

  message: any;
  constructor(private router: Router, private _loginService: LoginService ) {


  }

  ngOnInit() {


  }

  public login(){

    //this.router.navigate(['dashboard']);
    try {
    console.log(this.user);
    this._loginService.login(this.user).subscribe(response=>{
      console.log(response);
        if(response.success==true ){
          this.user=response.user;
          this.router.navigate(['dashboard/admin']);
          console.log(this.user);
          localStorage.setItem('user',JSON.stringify(this.user));
          this.message = [];
          this.message.push({severity:'Ingreso Correcto', summary:'Ingreso Correcto', detail:'Bienvenido'+this.user.username});
        }else{
          console.log('error en nombre de usuario o password');
          this.message = [];
          this.message.push({severity:'error', summary:'Error ', detail:'Error en nombre de usuario o password'});
         // this.message='error en nombre de usuario o password';
        }
    }, error=>{
      console.log('error en nombre de usuario o password');
     this.message='error en nombre de usuario o password';

    });
    }catch (exception){
      console.log('error en nombre de usuario o password');
      this.message='error en nombre de usuario o password';
    }
  }



}
