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
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-mhs-to-questions',
    standalone: true,
    imports: [CommonModule, TuiButtonModule, RouterLink],
    templateUrl: './mhs-to-questions.component.html',
    styleUrl: './mhs-to-questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhsToQuestionsComponent implements OnInit {
    private readonly firebase = inject(FirebaseService);
    private questionsMhsTo: QuestionInterface[] = [];
    readonly questionsForShow = signal<QuestionInterface | null>(null);
    private count = 1;

    ngOnInit(): void {
        this.firebase
            .getMhsToQuestions()
            .pipe(take(1))
            .subscribe((next) => (this.questionsMhsTo = next));
    }

    getToQuestions(): void {
        this.questionsForShow.set(this.questionsMhsTo[this.count]);
        ++this.count;
    }
}
