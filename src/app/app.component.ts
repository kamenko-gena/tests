import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiButtonModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'mhs-exam-tests-upgrade';
}
