import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import LoginRegister from './pages/loginRegister/LoginRegister';
import ClassManager from './pages/classManager/ClassManager';
import StudentsPage from './pages/studentsPage/StudentsPage';
import DateProvider from './context/DateContext';
import PreviousSpeakingCorrections from './pages/previousSpeakingCorrections/PreviousSpeakingCorrections';
import { AuthProvider } from './context/AuthContext';
import JoinClass from './pages/joinClass/JoinClass';
import UserManager from './pages/userManager/UserManager';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Footer from './components/footer/Footer';
import MyActivities from './pages/myActivities/MyActivities';
import CreateTextAndVideoExercise from './pages/createTextAndVideoActivity/CreateTextAndVideoExercise';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StartPageInfo } from './context/StartPageContext';
import StartPage from './pages/startPage/StartPage';


function App() {
  return (
    <>
      <DateProvider>
        <AuthProvider>
          <StartPageInfo>
            <main>
              <Header />
              <Routes>
                <Route path='/' element={<StartPage />} />
                <Route path='/create-exercise' element={<CreateTextAndVideoExercise />} />
                <Route path='/my-activities' element={<MyActivities />} />
                <Route path='/class-manager' element={<ClassManager />} />
                <Route path='/students-page' element={<StudentsPage />} />
                <Route path='/speaking-corrections' element={<PreviousSpeakingCorrections />} />
                <Route path='/login-register' element={<LoginRegister />} />
                <Route path='/join-class' element={<JoinClass />} />
                <Route path='/user-manager' element={<UserManager />} />
              </Routes>
              <Footer />
            </main>
            <ToastContainer />
          </StartPageInfo>
        </AuthProvider>
      </DateProvider>
    </>
  )
}

export default App
