import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router'; // import Router

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/.+@.+\..+/)]],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      picture: ['', Validators.required],
      location: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        timezone: ['', Validators.required],
      }),
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const userData = {
        title: this.form.get('title')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        gender: this.form.get('gender')?.value,
        email: this.form.get('email')?.value,
        dateOfBirth: this.form.get('dateOfBirth')?.value,
        phone: this.form.get('phone')?.value,
        picture: this.form.get('picture')?.value,
        location: this.form.get('location')?.value,
      }
      this.userService.createUser(userData).subscribe({
        next: (user: User) => {
          console.log('Usuário criado com sucesso!', user);
          this.router.navigate(['/user-list']);
        },
        error: (error: any) => {
          console.error('Ocorreu um erro ao criar o usuário!', error);
        }
      });
    }
  }

}
