import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import ReviewerConsole from './components/ReviewerConsole'

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return <ReviewerConsole onBackToLanding={() => setShowDashboard(false)} />
  }

  return <LandingPage onEnterDashboard={() => setShowDashboard(true)} />
}