import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [CommonModule, TuiButtonModule, RouterModule],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
