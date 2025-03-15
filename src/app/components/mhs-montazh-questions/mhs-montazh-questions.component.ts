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

@Component({
    selector: 'app-mhs-montazh-questions',
    standalone: true,
    imports: [CommonModule, TuiButtonModule, ExamAreaComponent],
    templateUrl: './mhs-montazh-questions.component.html',
    styleUrl: './mhs-montazh-questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhsMontazhQuestionsComponent implements OnInit {
    readonly showAllMontazh = signal<boolean>(false);
    readonly setLoading = signal<boolean>(false);
    private readonly firebase = inject(FirebaseService);
    questionsMhsMontazh: QuestionInterface[] = [];

    ngOnInit(): void {
        this.setLoading.set(true);
        this.firebase
            .getMhsMontazhQuestions()
            .pipe(take(1))
            .subscribe({
                next: (next) => (this.questionsMhsMontazh = next),
                complete: () => {
                    this.setLoading.set(false);
                },
            });
    }

    startMontazhQuestions(): void {
        this.showAllMontazh.set(true);
    }
}
