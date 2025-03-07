import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { QuestionInterface } from 'src/app/interfaces/question-interface';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    private readonly firestore = inject(Firestore);
    private readonly mhsQuestionsCollect = collection(this.firestore, 'mhs');

    getMhsQuestions(): Observable<QuestionInterface[]> {
        return collectionData(this.mhsQuestionsCollect, {
            idField: 'id',
        }) as Observable<QuestionInterface[]>;
    }
}
