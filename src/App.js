import './App.css';
import LoanCalc from './Components/LoanCalc';
import GitHubIcon from '@material-ui/icons/GitHub';

function App() {
  return (
    <div className="main">
      <div className="loan-calc">
        <LoanCalc title="Housing Loan Calculator" interest="3.5" />
      </div>
      <div className="footer">©Marcin Michalik for Visma  <a href="https://github.com/terragady/visma-test" target="_blank" rel="noreferrer"><GitHubIcon /></a></div>
    </div>
  );
}

export default App;
