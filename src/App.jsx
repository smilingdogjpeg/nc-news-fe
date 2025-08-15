import './App.css'
import Header from './components/Header/Header'
import ArticlesListPage from './pages/ArticlesListPage/ArticlesListPage'
import ArticlePage from './pages/ArticlePage/ArticlePage'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'

const App = () => {

  return (
    <div>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticlesListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  )
}


export default App
