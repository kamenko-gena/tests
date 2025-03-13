import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionInterface } from 'src/app/interfaces/question-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    TuiButtonModule,
    TuiExpandModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputNumberModule, TuiRadioLabeledModule } from '@taiga-ui/kit';
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
    ],
    templateUrl: './exam-area.component.html',
    styleUrl: './exam-area.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamAreaComponent implements OnInit {
    @Input() allQuestionsData: QuestionInterface[] = [];
    readonly questionsForShow = signal<QuestionInterface | null>(null);
    readonly showErrorExpand = signal<boolean>(false);
    readonly showCorrectExpand = signal<boolean>(false);
    private userQuestionNum = localStorage.getItem('currentQuestion');
    userClosedQuestions: number[] =
        localStorage
            .getItem('closedQuestions')
            ?.split(',')
            .filter((elem) => elem !== '')
            .map((elem) => Number(elem)) ?? [];
    currentNum = 0;

    readonly userAnswer = new FormControl<string>('a');
    readonly inputQuestionNumber = new FormControl<number | null>(null);

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
            this.showErrorExpand.set(true);
        } else {
            this.showCorrectExpand.set(true);
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
        this.showErrorExpand.set(false);
        this.showCorrectExpand.set(false);
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
        this.showErrorExpand.set(false);
        this.showCorrectExpand.set(false);
        this.currentNum = 0;
        this.userClosedQuestions = [];
        localStorage.setItem('currentQuestion', this.currentNum.toString());
        localStorage.setItem(
            'closedQuestions',
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
