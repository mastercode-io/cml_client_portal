import "./App.css"
import CreditSearchForm from "./components/CreditSearchForm"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>CML Client Portal</h1>
        </div>
      </header>
      <main className="container">
        <CreditSearchForm />
      </main>
      <footer className="App-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CML Client Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

