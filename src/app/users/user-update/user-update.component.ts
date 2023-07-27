import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user!: User;
  form!: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      picture: ['', Validators.required],
      location: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        timezone: ['', Validators.required]
      })
    });
  }

  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
        if (user.dateOfBirth) {
          user.dateOfBirth = new Date(user.dateOfBirth).toISOString().slice(0,10);
        }
        this.form.patchValue(user);
      });
    }
  }
  updateUser(): void {
    if (this.form.valid) {
      this.userService.updateUser(this.user.id, this.form.value).subscribe({
        next: () => {
         alert('Usuário atualizado com sucesso!');
        },
        error: (error: any) => {
          console.error('Ocorreu um erro!', error);
        },
        complete: () => {
          this.router.navigate(['/user-list']);
        },
      });
    }
  }
}
