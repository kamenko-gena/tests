import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { QuestionsComponent } from './components/questions/questions.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, QuestionsComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'mhs-exam-tests-upgrade';
}
