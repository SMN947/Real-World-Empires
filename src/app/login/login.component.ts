import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  GoTo = null;
  showPassword = false;
  form: FormGroup;
  registerForm: FormGroup;
  send = false;
  loading = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private Login: LoginService) {
    this.form = fb.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });
    
    this.registerForm = fb.group({
      userr: [null, Validators.required],
      passwordr: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.GoTo = this.route.snapshot.paramMap.get('GoTo');
    this.Login.checkToken();
    console.log(this.GoTo);
  }

  login(valid) {
    this.loading = true;
    if (valid) {
      const input = this.form.value;
      this.Login.login(input.user, input.password).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          this.Login.setUser(res);
          this.router.navigate([(this.GoTo != null)?this.GoTo:'/ne/main']);
        } else {
          alert("Login fallo");
        }

        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  register(valid) {
    this.loading = true;
    if (valid) {
      const input = this.form.value;
      this.Login.login(input.user, input.password).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          console.log("User Created");
        } else {
          alert("Login fallo");
        }

        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
  //regiter
}
