import Header from './components/Header'
import Summary from './components/Summary'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Summary />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
      </main>
      <Footer />
    </>
  )
}

export default App
