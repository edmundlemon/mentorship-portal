import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Dashboard from './dashboard.jsx'
import Header from './components/header.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Forum from './forum.jsx'
import Matchmaking from './Matchmaking.jsx'
import Profile from './Profile.jsx'
import Chat from './Chat.jsx'
import ProjectBoards from './ProjectBoards'
import ForumPostDetail from './ForumPostDetail'
import ProjectsDirectory from './ProjectsDirectory.jsx'
import MentorsDirectory from './mentorsDirectory.jsx'

function App() {
  const location = useLocation()
  const hideHeaderRoutes = ['/login', '/register']

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/projects" element={<ProjectBoards />} />
        <Route path="/forum/:id" element={<ForumPostDetail />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/projects-directory" element={<ProjectsDirectory />} />
        <Route path="/mentors-directory" element={<MentorsDirectory />} />
      </Routes>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)