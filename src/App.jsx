import './App.css'
import Header from './components/Header'
import GetArticles from './components/GetArticles'
import GetArticleByID from './components/GetArticleByID'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {

  return (
    <div>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<GetArticles />} />
        <Route path="/articles/:article_id" element={<GetArticleByID />} />
      </Routes>
    </div>
  )
}


export default App
