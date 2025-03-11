import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { MainPageComponent } from './components/main-page/main-page.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiAlertModule, MainPageComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'mhs-exam-tests-upgrade';
}
