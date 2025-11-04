import { Component } from '@angular/core';

import { User } from '../models';
import { AccountService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    get user(): User | null {
        return this.accountService.userValue;
    }

    constructor(private accountService: AccountService) {}
}