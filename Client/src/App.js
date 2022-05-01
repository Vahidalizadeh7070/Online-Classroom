import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Layout from './Components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import React,{ useContext } from 'react';
import AuthContext from './store/auth-context';
import AuthPage from './Pages/AuthPage';
import { Redirect } from 'react-router-dom';
import ListOfCourses from './Components/Course/ListOfCourses';
import ListOfTeachers from './Components/Teacher/ListOfTeachers';
import CourseDetails from './Pages/Courses/CourseDetailsPage';
import UserProfilePage from './Pages/UserProfile/UserProfilePage';
import LobbyPage from './Pages/Classroom/LobbyPage';

function App() {
  const context = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <div className='container'>
            <div className='row mt-3'>
              <div className='col-md-6'>
                <ListOfCourses />
              </div>
              <div className='col-md-6'>
                <ListOfTeachers />
              </div>
            </div>
            <hr/>
            <div className=''>
              <p>@ Online Classrooms -2022</p>
            </div>
          </div>
        </Route>
        {!context.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}

        <Route path='/CourseDetails/:id'>
          <CourseDetails />
        </Route>

        {
          <Route path='/profile'>
            {context.isLoggedIn && (
              <UserProfilePage />
            )}
            {
              !context.isLoggedIn && (
                <Redirect to='/auth' />
              )
            }
          </Route>
        }
        {
          context.isLoggedIn && (
            <Route path={'/Lobby/:courseId'}>
              <LobbyPage />
              {
                !context.isLoggedIn && (
                  <Redirect to={'/auth'} />
                )
              }
            </Route>
          )
        }
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
