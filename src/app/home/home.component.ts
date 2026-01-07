import { Component, inject } from '@angular/core';

import { User } from '../models';
import { AccountService } from '../services';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'home.component.html',
    imports: [RouterLink]
})
export class HomeComponent {
    user: User | null;

    private accountService = inject(AccountService);

    constructor() {
        this.user = this.accountService.userValue;
    }
}