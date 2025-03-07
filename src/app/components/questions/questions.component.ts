import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {}
