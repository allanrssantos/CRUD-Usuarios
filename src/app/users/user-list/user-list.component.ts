import { Component, OnInit, HostListener } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  error: any;

  total: number = 0;
  pageSize: number = 8;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.users.push(...response.data);
        this.total = response.total;
        this.currentPage++;
      },
      error: (error: any) => {
        this.error = error;
        console.error('Ocorreu um erro!', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error: any) => {
        this.error = error;
        console.error('Ocorreu um erro ao deletar o usuário!', error);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getUsers();
    }
  }
}
