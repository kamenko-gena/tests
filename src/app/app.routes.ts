import { Route } from '@angular/router';
import { MhsMontazhQuestionsComponent } from './components/mhs-montazh-questions/mhs-montazh-questions.component';
import { MhsToQuestionsComponent } from './components/mhs-to-questions/mhs-to-questions.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const appRoutes: Route[] = [
    {
        path: 'mhs-montazh',
        component: MhsMontazhQuestionsComponent,
    },
    {
        path: 'mhs-to',
        component: MhsToQuestionsComponent,
    },
    {
        path: '',
        component: MainPageComponent,
    },
];
