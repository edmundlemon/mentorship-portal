import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom' // Added Navigate
import './index.css'

// ... existing imports ...
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

// Import the new component
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

function App() {
  const location = useLocation()
  
  // You might want to hide header on '404' pages too, but this is fine for now
  const hideHeaderRoutes = ['/login', '/register']

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        {/* --- PUBLIC ROUTES (Anyone can access) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- PROTECTED ROUTES (Only logged in users) --- */}
        {/* We wrap all private routes inside this one parent Route */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<ForumPostDetail />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/projects" element={<ProjectBoards />} />
            <Route path="/projects-directory" element={<ProjectsDirectory />} />
            <Route path="/mentors-directory" element={<MentorsDirectory />} />
        </Route>

        {/* --- CATCH ALL / 404 --- */}
        {/* Ideally, redirect to dashboard if logged in, or login if not */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
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