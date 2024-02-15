import { CategoriesPage } from "./components/otherPages/CategoriesPage"
import { CategoryPage } from "./components/otherPages/CategoryPage"
import { Login } from "./components/otherPages/LoginPage"
import { RegisterPage } from "./components/otherPages/RegisterPage"
import { CreatePage } from "./components/otherPages/createPage"
import { Route, Routes, useNavigate, useRoutes } from "react-router-dom"
import { HomePage } from "./components/homePageSections/homePage"
import { useEffect } from "react"
import { ProfilePage } from "./components/otherPages/userProfile"
import { UserProfilePage } from "./components/otherPages/usersProfilePage"


function App() {

  const PrivateRoute = ({ element }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!localStorage.getItem('auth')) {
        navigate('/');
      }
    }, [navigate]);
  
    return element();
  };

  const PublicRoute = ({ element }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (localStorage.getItem('auth')) {
        navigate('/');
      }
    }, [navigate]);
  
    return element();
  };

    return (
      <>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/me" element={<PrivateRoute element={() => <ProfilePage/>}/>}/>
        <Route path="/:id" element={<UserProfilePage/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/category/:category/:bookId" element={<CategoryPage />}/>
        <Route path="/login" element={<PublicRoute element={() => <Login/>}/>}/>
        <Route path="/register" element={<PublicRoute element={() => <RegisterPage/>}/>}/>
        <Route path="/add" element={<PrivateRoute element={() => <CreatePage />}/>}/>
      </Routes>
  </>
  
    )

  }

export default App
