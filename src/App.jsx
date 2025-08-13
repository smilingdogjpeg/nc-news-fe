import './App.css'
import Header from './components/Header'
import GetArticles from './components/GetArticles'
import { Routes, Route } from 'react-router-dom'
import ArticlesButton from './components/homepage-options/ArticlesButton'


const App = () => {
console.log("Hellooo")

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/articles" element={<GetArticles />} />
        <Route path="/" element={<ArticlesButton />} />
      </Routes>
    </div>
  )
}


export default App
