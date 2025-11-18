import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { User } from '../models';
import { AccountService } from '../services';

@Component({ 
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class HomeComponent {
    user: User | null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}