import './App.css';
import LoanCalc from './Components/LoanCalc';

function App() {
  return (
    <div className="main">
      <div className="loan-calc">
        <LoanCalc title="Housing Loan Calculator" interest="3.5" />
      </div>
      <div className="footer">©Marcin Michalik for Visma</div>
    </div>
  );
}

export default App;
