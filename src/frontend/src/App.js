import React from 'react';
import './App.css';
import CreditSearchForm from './components/CreditSearchForm';

function App() {
  return (
    <div className="app">
      <main className="app-main">
        <CreditSearchForm />
      </main>
      <footer className="app-footer">
        <div className="container">
          <p> {new Date().getFullYear()} HT Legal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
