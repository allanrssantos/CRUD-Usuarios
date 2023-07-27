import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  age!: number;

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.calculateAge(user.dateOfBirth);
        },
        error: (error: any) => {
          console.error('Ocorreu um erro ao buscar o usuário!', error);
        }
      });
    }
  }

  calculateAge(dateOfBirth: any): void {
    const birthDate = new Date(dateOfBirth);
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }
}
