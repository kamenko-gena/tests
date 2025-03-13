import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionInterface } from 'src/app/interfaces/question-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    TuiButtonModule,
    TuiDialogService,
    TuiExpandModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
    TuiBadgeModule,
    TuiCheckboxLabeledModule,
    TuiInputNumberModule,
    TuiRadioLabeledModule,
} from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-exam-area',
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiRadioLabeledModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiInputNumberModule,
        RouterLink,
        TuiExpandModule,
        TuiCheckboxLabeledModule,
        TuiBadgeModule,
    ],
    templateUrl: './exam-area.component.html',
    styleUrl: './exam-area.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamAreaComponent implements OnInit {
    @Input() allQuestionsData: QuestionInterface[] = [];
    @Input() sectionName = '';
    private readonly dialogs = inject(TuiDialogService);
    readonly questionsForShow = signal<QuestionInterface | null>(null);
    readonly showErrorExpand = signal<boolean>(false);
    readonly showCorrectExpand = signal<boolean>(false);
    private userQuestionNum = '';
    private userClosedQuestions: number[] = [];
    private userCorrectAnswers = 0;
    currentNum = 0;

    readonly userAnswer = new FormControl<string>('a');
    readonly inputQuestionNumber = new FormControl<number | null>(null);
    readonly setRandom = new FormControl<boolean>(false);

    ngOnInit(): void {
        this.userQuestionNum =
            localStorage.getItem(`currentQuestion-${this.sectionName}`) ?? '';
        this.userClosedQuestions =
            localStorage
                .getItem(`closedQuestions-${this.sectionName}`)
                ?.split(',')
                .filter((elem) => elem !== '')
                .map((elem) => Number(elem)) ?? [];
        this.userCorrectAnswers = Number(
            localStorage.getItem(`correctAnswers-${this.sectionName}`),
        );
        if (this.userQuestionNum) {
            this.currentNum = Number(this.userQuestionNum);
        } else {
            localStorage.setItem(
                `currentQuestion-${this.sectionName}`,
                this.currentNum.toString(),
            );
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

    showResult(correctAnswer: string, questionNum: number): void {
        this.userAnswer.disable();
        if (this.userAnswer.value !== correctAnswer) {
            this.showErrorExpand.set(true);
        } else {
            this.showCorrectExpand.set(true);
            ++this.userCorrectAnswers;
            console.log('Всего правильный ответов: ', this.userCorrectAnswers);
            localStorage.setItem(
                `correctAnswers-${this.sectionName}`,
                this.userCorrectAnswers.toString(),
            );
        }

        this.userClosedQuestions = [...this.userClosedQuestions, questionNum];
        localStorage.setItem(
            `closedQuestions-${this.sectionName}`,
            this.userClosedQuestions.toString(),
        );

        if (this.userClosedQuestions.length === this.allQuestionsData.length - 73) {
            // Если ответили более чем на 80%
            if (
                (this.userCorrectAnswers * 100) /
                    this.allQuestionsData.length >=
                80
            ) {
                this.openResultPrompt(
                    `<h3 style="color: green;">Экзамен сдан!</h3>`,
                );
            }
            this.openResultPrompt(
                `<h3 style="color: red;">Экзамен не сдан!</h3>`,
            );
        }
    }

    openResultPrompt(content: string): void {
        this.dialogs
            .open(content, {
                label: 'Результат',
                appearance: 'result',
                size: 's',
            })
            .subscribe();
    }

    showQuestionByNumber(questionNum: number): void {
        this.showErrorExpand.set(false);
        this.showCorrectExpand.set(false);
        this.currentNum = questionNum;
        this.questionsForShow.set(this.allQuestionsData[this.currentNum]);
        if (this.userQuestionNum) {
            localStorage.setItem(
                `currentQuestion-${this.sectionName}`,
                this.currentNum.toString(),
            );
        }
        this.userClosedQuestions.includes(this.currentNum)
            ? this.userAnswer.disable()
            : this.userAnswer.enable();
    }

    resetDataQuestions(): void {
        this.showErrorExpand.set(false);
        this.showCorrectExpand.set(false);
        this.currentNum = 0;
        this.userClosedQuestions = [];
        this.userCorrectAnswers = 0;
        localStorage.setItem(
            `correctAnswers-${this.sectionName}`,
            this.userCorrectAnswers.toString(),
        );
        localStorage.setItem(
            `currentQuestion-${this.sectionName}`,
            this.currentNum.toString(),
        );
        localStorage.setItem(
            `closedQuestions-${this.sectionName}`,
            this.userClosedQuestions.toString(),
        );
        this.startExam();
    }

    setQuestionNumber(): void {
        let question = this.inputQuestionNumber.value;
        if (!question) {
            return;
        }
        if (question - 1 <= 0) {
            question = 1;
        } else if (question - 1 >= this.allQuestionsData.length) {
            question = this.allQuestionsData.length;
        }
        this.showQuestionByNumber(question - 1);
    }
}
