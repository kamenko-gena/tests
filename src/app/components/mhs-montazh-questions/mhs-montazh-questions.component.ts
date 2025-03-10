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
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-mhs-montazh-questions',
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiRadioLabeledModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './mhs-montazh-questions.component.html',
    styleUrl: './mhs-montazh-questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhsMontazhQuestionsComponent implements OnInit {
    private readonly firebase = inject(FirebaseService);
    questionsMhsMontazh: QuestionInterface[] = [];
    readonly questionsForShow = signal<QuestionInterface | null>(null);
    count = 0;

    readonly userAnswer = new FormControl<string>('a', {
        nonNullable: true,
        validators: [Validators.required],
    });

    ngOnInit(): void {
        this.firebase
            .getMhsMontazhQuestions()
            .pipe(take(1))
            .subscribe((next) => (this.questionsMhsMontazh = next));
    }

    startMontazhQuestions(): void {
        this.userAnswer.enable();
        this.questionsForShow.set(this.questionsMhsMontazh[0]);
        this.count = 0;
    }

    showResult(correctAnswer: string): void {
        this.userAnswer.disable();
        console.log('Правильный ответ: ', correctAnswer);
        console.log('Вы ответили: ', this.userAnswer.value);
        if (this.userAnswer.value === correctAnswer) {
            console.log('Вы ответили верно!');
        } else {
            console.log('Вы ответили не верно! Верный ответ: ', correctAnswer);
        }
    }

    showQuestionByNumber(questionNum: number): void {
        this.count = questionNum;
        this.questionsForShow.set(this.questionsMhsMontazh[this.count]);
        this.userAnswer.enable();
    }
}
