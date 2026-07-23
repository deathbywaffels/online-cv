import Header from './components/Header'
import Summary from './components/Summary'
import Skills from './components/Skills'
import Showcase from './components/Showcase'
import Experience from './components/Experience'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Footer from './components/Footer'
import PrintResume from './components/PrintResume'

function App() {
  return (
    <>
      <div className="no-print">
        <Header />
        <main>
          <Summary />
          <Skills />
          <Showcase />
          <Experience />
          <Education />
          <Achievements />
        </main>
        <Footer />
      </div>
      <PrintResume />
    </>
  )
}

export default App
