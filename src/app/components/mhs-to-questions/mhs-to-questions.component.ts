import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionInterface } from 'src/app/interfaces/question-interface';
import { FirebaseService } from 'src/app/services/firebase-service/firebase.service';
import { take } from 'rxjs';
import { TuiButtonModule } from '@taiga-ui/core';
import { ExamAreaComponent } from '../exam-area/exam-area.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mhs-to-questions',
    standalone: true,
    imports: [CommonModule, TuiButtonModule, ExamAreaComponent, RouterLink],
    templateUrl: './mhs-to-questions.component.html',
    styleUrl: './mhs-to-questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhsToQuestionsComponent implements OnInit {
    readonly showAllTO = signal<boolean>(false);
    readonly setLoading = signal<boolean>(false);
    private readonly firebase = inject(FirebaseService);
    questionsMhsTO: QuestionInterface[] = [];

    ngOnInit(): void {
        this.setLoading.set(true);
        this.firebase
            .getMhsTOQuestions()
            .pipe(take(1))
            .subscribe({
                next: (next) => (this.questionsMhsTO = next),
                complete: () => {
                    this.setLoading.set(false);
                },
            });
    }

    startTOQuestions(): void {
        this.showAllTO.set(true);
    }
}
