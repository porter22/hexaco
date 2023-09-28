import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserList from '../pages/UserList';
import QuestionList from '../pages/QuestionList';
import ResponseForm from '../pages/ResponseForm';
import AddNewEmployee from '../pages/AddNewEmployee';
import CreateGroupPage from '../pages/CreateGroupPage';
import AssignAssessment from '../pages/AssignAssessment';
import ResultsPage from '../pages/ResultsPage';
import ResponseDetailsPage from '../pages/ResponseDetailsPage';

export const routePaths = {
  home: '/',
  login: '/login',
  admin: '/admin',
  createGroup: '/create-group',
  assignAssessment: '/assign-assessment',
  results: '/results',
  userlist: '/userlist',
  questionlist: '/questionlist',
  responseform: '/responseform',
  responseDetails: '/response-details/:event_id',
};

export const routeComponents = {
  home: HomePage,
  login: LoginPage,
  admin: AddNewEmployee,
  createGroup: CreateGroupPage,
  assignAssessment: AssignAssessment,
  results: ResultsPage,
  userlist: UserList,
  questionlist: QuestionList,
  responseform: ResponseForm,
  responseDetails: ResponseDetailsPage,
};