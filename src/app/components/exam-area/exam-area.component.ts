import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionInterface } from 'src/app/interfaces/question-interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-exam-area',
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiRadioLabeledModule,
        ReactiveFormsModule,
        RouterLink,
        TuiExpandModule,
    ],
    templateUrl: './exam-area.component.html',
    styleUrl: './exam-area.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamAreaComponent implements OnInit {
    @Input() allQuestionsData: QuestionInterface[] = [];
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
        this.startExam();
    }

    startExam(): void {
        this.userAnswer.enable();
        this.questionsForShow.set(this.allQuestionsData[this.currentNum]);
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
        this.questionsForShow.set(this.allQuestionsData[this.currentNum]);
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
        this.startExam();
    }
}
