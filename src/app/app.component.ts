import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiCalendarModule, TuiRootModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiCalendarModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'mhs-exam-tests-upgrade';
}
