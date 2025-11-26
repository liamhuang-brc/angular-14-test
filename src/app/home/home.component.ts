import { Component } from '@angular/core';

import { User } from '../models';
import { AccountService } from '../services';
import { RouterLink } from '@angular/router';

@Component({ 
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class HomeComponent {
    user: User | null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}