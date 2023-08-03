import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/private/Dashboard.tsx';
import PrivateRoutes from './pages/PrivateRoutes.tsx';
import CreateAccount from './pages/CreateAccount.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import MyProfile from "./pages/private/MyProfile.tsx";
import SnippetPage from "./pages/private/SnippetPage.tsx";
import 'sweetalert2/src/sweetalert2.scss'
import UserProfile from "./pages/private/UserProfile.tsx";
import SearchPage from "./pages/private/SearchPage.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";

const App = () => {
    return (
        <>


            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/createaccount/:token" element={<CreateAccount/>}/>
                    <Route path="/forget-password/:token" element={<ForgetPassword/>}/>
                    <Route path="/user" element={<PrivateRoutes/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="me" element={<MyProfile/>}/>
                        <Route path="snippet/:id" element={<SnippetPage/>}/>
                        <Route path=":id" element={<UserProfile/>}/>
                        <Route path="search/:query" element={<SearchPage/>}/>
                    </Route>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
