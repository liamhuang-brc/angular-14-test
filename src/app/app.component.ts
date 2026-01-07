import { Component, inject } from '@angular/core';

import { AccountService } from './services';
import { User } from './models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', standalone: false })
export class AppComponent {
    user?: User | null;

    private accountService = inject(AccountService);

    constructor() {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}