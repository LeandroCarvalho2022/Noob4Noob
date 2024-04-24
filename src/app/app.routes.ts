import { Routes } from '@angular/router';
import { CardPrevComponent } from './components/card-prev/card-prev.component';
import { HomeComponent } from './components/home/home.component';
import { StudyhomepageComponent } from './components/studycomps/studyhomepage/studyhomepage.component';
import { StudyformComponent } from './components/studycomps/studyform/studyform.component';
import { PostcompComponent } from './components/studycomps/postcomp/postcomp.component';
import { ColorpickerComponent } from './components/studycomps/colorpicker/colorpicker.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { ContatoComponent } from './components/contato/contato.component';
import { HomeforumComponent } from './components/forumcomps/homeforum/homeforum.component';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { UserTempComponent } from './components/auth/user-temp/user-temp.component';
import { ResetpasswordComponent } from './components/loginform/resetpassword/resetpassword.component';
import { CarrouselModalComponent } from './components/modals/carrousel-modal/carrousel-modal.component';
import { FireFormComponent } from './components/studycomps/fire-form/fire-form.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
    {
        path: '', component: HomeComponent 
    }
    ,
    {
        path: 'cardprev', component: CardPrevComponent 
    }    
    ,
    {
        path: 'study', component: StudyhomepageComponent,
        },
    {
        path: 'formstudy',  component: StudyformComponent ,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: 'posts', component: PostcompComponent
    },
    {
        path: 'picker', component: ColorpickerComponent
    },
    {
        path: 'login', component: LoginformComponent
    },
    {
        path: 'forgot', component: ResetpasswordComponent
    },
    {
        path: 'register', component: RegisterformComponent
    },
    {
        path: 'contato', component: ContatoComponent
    },
    {
        path: 'forum', component: HomeforumComponent
    },
    {
        path: 'user', component: UserTempComponent
    },
    {
        path: 'fireForm', component: FireFormComponent
    },

];
