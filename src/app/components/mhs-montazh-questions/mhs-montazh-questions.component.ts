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
import { TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';
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
        TuiExpandModule,
    ],
    templateUrl: './mhs-montazh-questions.component.html',
    styleUrl: './mhs-montazh-questions.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MhsMontazhQuestionsComponent implements OnInit {
    private readonly firebase = inject(FirebaseService);
    questionsMhsMontazh: QuestionInterface[] = [];
    readonly questionsForShow = signal<QuestionInterface | null>(null);
    private userQuestionNum = localStorage.getItem('currentQuestion');
    userClosedQuestions: number[] =
        localStorage
            .getItem('closedQuestions')
            ?.split(',')
            .filter((elem) => elem !== '')
            .map((elem) => Number(elem)) ?? [];
    showErrorExpand = false;
    currentNum = 0;

    readonly userAnswer = new FormControl<string>('a', {
        nonNullable: true,
        validators: [Validators.required],
    });

    ngOnInit(): void {
        if (this.userQuestionNum) {
            this.currentNum = Number(this.userQuestionNum);
        } else {
            localStorage.setItem('currentQuestion', this.currentNum.toString());
        }
        this.firebase
            .getMhsMontazhQuestions()
            .pipe(take(1))
            .subscribe((next) => (this.questionsMhsMontazh = next));
    }

    startMontazhQuestions(): void {
        console.log('Текущие закрытые овпросы: ', this.userClosedQuestions);
        this.userAnswer.enable();
        this.questionsForShow.set(this.questionsMhsMontazh[this.currentNum]);
        this.userClosedQuestions.includes(this.currentNum)
            ? this.userAnswer.disable()
            : this.userAnswer.enable();
    }

    showResult(correctAnswer: string, currentQuestion: number): void {
        this.userAnswer.disable();
        console.log('Правильный ответ: ', correctAnswer);
        console.log('Вы ответили: ', this.userAnswer.value);
        if (this.userAnswer.value !== correctAnswer) {
            this.showErrorExpand = true;
        }

        this.userClosedQuestions = [
            ...this.userClosedQuestions,
            currentQuestion,
        ];
        localStorage.setItem(
            'closedQuestions',
            this.userClosedQuestions.toString(),
        );
    }

    showQuestionByNumber(questionNum: number): void {
        this.showErrorExpand = false;
        this.currentNum = questionNum;
        this.questionsForShow.set(this.questionsMhsMontazh[this.currentNum]);
        if (this.userQuestionNum) {
            localStorage.setItem('currentQuestion', this.currentNum.toString());
        }
        this.userClosedQuestions.includes(this.currentNum)
            ? this.userAnswer.disable()
            : this.userAnswer.enable();
    }

    resetDataQuestions(): void {
        this.currentNum = 0;
        this.userClosedQuestions = [];
        localStorage.setItem('currentQuestion', this.currentNum.toString());
        localStorage.setItem(
            'closedQuestions',
            this.userClosedQuestions.toString(),
        );
        this.startMontazhQuestions();
    }
}
