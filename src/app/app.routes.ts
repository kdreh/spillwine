import {Routes} from '@angular/router';
import {SignInComponent} from "./authentication/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./authentication/pages/sign-up/sign-up.component";
import {ResetPasswordComponent} from "./authentication/pages/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./authentication/pages/forgot-password/forgot-password.component"
import {EmailConfirmationComponent} from "./authentication/pages/email-confirmation/email-confirmation.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {DashboardContainerComponent} from "./pages/containers/dashboard-container/dashboard-container.component";
import {AccountContainerComponent} from "./pages/containers/account-container/account-container.component";
import {CustomAssessmentsComponent} from "./features/admin-features/custom-assessments/custom-assessments.component";
import {MeetingNotesComponent} from "./features/admin-features/meeting-notes/meeting-notes.component";
import {NotificaitonComponent} from "./shared/components/notificaiton/notificaiton.component";
import {ChatGptComponent} from "./features/chat-gpt/chat-gpt.component";
import {
  AssessmentContainerComponent
} from "./features/user-features/containers/assessment-container/assessment-container.component";
import {ToolsContainerComponent} from "./features/user-features/containers/tools-container/tools-container.component";
import {SettingsComponent} from "./pages/account/settings/settings.component";
import {
  ResultsContainerComponent
} from "./features/user-features/containers/results-container/results-container.component";
import {AffiliateDisclaimerComponent} from "./authentication/pages/affiliate-disclaimer/affiliate-disclaimer.component";
import {TermsOfUseComponent} from "./authentication/pages/terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./authentication/pages/privacy-policy/privacy-policy.component";
import {StrategyComponent} from "./features/user-features/assessments/questions/strategy/strategy.component";
import {MarketingComponent} from "./features/user-features/assessments/questions/marketing/marketing.component";
import {OperationComponent} from "./features/user-features/assessments/questions/operation/operation.component";
import {TeamComponent} from "./features/user-features/assessments/questions/team/team.component";
import {authGuard, loginGuard} from "./services/auth.guard";
import {
  UserBusinessProfileComponent
} from "./pages/account/business-profile/user-business-profile/user-business-profile.component";
import {
  AdminBusinessProfileComponent
} from "./pages/account/business-profile/admin-business-profile/admin-business-profile.component";
import {AdminTodoFormComponent} from "./features/admin-features/admin-todo-form/admin-todo-form.component";
import {ActionItemEditComponent} from "./features/user-features/action-item-edit/action-item-edit.component";
import { ToDoListComponent} from "./features/user-features/todo-list/todo-list.component";
import {UserDocumentsComponent} from "./tools/user-documents/user-documents.component";
import {ViewUserDocumentsComponent} from "./features/admin-features/view-user-documents/view-user-documents.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {ActionPlanComponent} from "./features/user-features/action-plan/action-plan.component";

export const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent, canActivate:[loginGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate:[loginGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate:[loginGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate:[loginGuard]},
  {path: 'email-confirmation', component: EmailConfirmationComponent, canActivate:[loginGuard]},
  {path: 'affiliate', component:AffiliateDisclaimerComponent, canActivate:[loginGuard]},
  {path: 'terms-of-use', component:TermsOfUseComponent},
  {path: 'privacy-policy', component:PrivacyPolicyComponent},
  { path:'app', component:NavigationComponent,
    children: [
      { path: 'business-profile', component: UserBusinessProfileComponent },
      { path: 'admin-business-profile-form', component: AdminBusinessProfileComponent },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardContainerComponent, canActivate:[authGuard]},
      {path: 'account', component: AccountContainerComponent, canActivate:[authGuard]},
      {path: 'ai-assistant', component: ChatGptComponent, canActivate:[authGuard]},
      {path: 'action-plan',component: ActionPlanComponent, canActivate:[authGuard]},
      {path: 'assessments', component: AssessmentContainerComponent, canActivate:[authGuard]},
      {path: 'user-documents', component:UserDocumentsComponent, canActivate:[authGuard]},
      {path: 'admin-documents', component:MeetingNotesComponent, canActivate:[authGuard]},
      {path: 'view-user-docs', component:ViewUserDocumentsComponent, canActivate:[authGuard]},
      {path: 'strategy-assessment', component:StrategyComponent, canActivate:[authGuard]},
      {path: 'marketing-assessment', component:MarketingComponent, canActivate:[authGuard]},
      {path: 'operation-assessment', component:OperationComponent, canActivate:[authGuard]},
      {path: 'team-assessment', component: TeamComponent, canActivate:[authGuard]},
      {path: 'results', component: ResultsContainerComponent, canActivate:[authGuard]},
      {path: 'tools', component: ToolsContainerComponent, canActivate:[authGuard]},
      {path: 'custom-assessments', component: CustomAssessmentsComponent, canActivate:[authGuard]},
      {path: 'admin-todo-form', component: AdminTodoFormComponent, canActivate:[authGuard]},
      {path: 'todo-list', component: ToDoListComponent, canActivate:[authGuard]},
      {path: 'action-item-edit', component: ActionItemEditComponent, canActivate:[authGuard]},
      {path: 'profile/:id', component: UserProfileComponent, canActivate:[authGuard]},
      {path: 'notification', component: NotificaitonComponent, canActivate:[authGuard]},
      {path: 'setting', component: SettingsComponent, canActivate:[authGuard]},
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
