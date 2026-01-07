import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AccountService } from '../services';

@Component({
    templateUrl: 'layout.component.html',
    imports: [RouterOutlet]
})
export class LayoutComponent {
    private router = inject(Router);
    private accountService = inject(AccountService);

    constructor() {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}