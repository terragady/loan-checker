import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { TextField, InputAdornment, Slider } from "@material-ui/core/";


// it generates nice numbers with thousands separators
function inputFormatter(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      isAllowed={(inputObj) => {
        const { value } = inputObj;
        if (value <= 500000000) return inputObj;
      }}
    />
  );
}

// calculating monthly payments and total payment and total interest
const calculateResults = (amount = 1, interest, years) => {
  const userAmount = Number(amount);
  const calculatedInterest = Number(interest) / 100 / 12;
  const calculatedPayments = Number(years) * 12;
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (userAmount * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    const monthlyPaymentCalculated = monthly.toFixed(2);
    const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
    const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);
    return {
      monthlyPayment: monthlyPaymentCalculated,
      totalPayment: totalPaymentCalculated,
      totalInterest: totalInterestCalculated,
      years,
    };
  }
  return;
};


export default function LoanCalc({ title, interest }) {
  const [loanAmount, setLoanAmount] = React.useState(null);
  const [years, setYears] = React.useState(20);
  const [calculated, setCalculated] = React.useState(0);

  const handleChangeLoan = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleYearsChange = (event, value) => {
    setYears(value);
  };

  useEffect(() => {
    setCalculated(calculateResults(loanAmount, interest, years))
  }, [years, loanAmount])

  const marks = [
    {
      value: 5,
      label: '5',
    },
    {
      value: 20,
      label: '20 years',
    },
    {
      value: 35,
      label: '35',
    },
  ];

  return (
    <>
      <div className="card-title">
        <h1>{title}</h1>
      </div>
      <div className="loan-amount">
        <TextField
          label="Loan amount"
          value={loanAmount}
          onChange={handleChangeLoan}
          name="loan-amount"
          InputProps={{
            inputComponent: inputFormatter,
            endAdornment: <InputAdornment position="end">NOK</InputAdornment>,
          }}
          inputProps={{ style: { textAlign: "right" } }}
        />
      </div>
      <div className="loan-slider">
        <Slider
          min={5}
          draggable="on"
          max={35}
          defaultValue={20}
          step={1}
          valueLabelDisplay="on"
          marks={marks}
          onChange={handleYearsChange}
        />
      </div>
      <div className="loan-results">
      <div className="loan-results-row">
          <div>Interest Rate:</div>
          <div>3.5%</div>
        </div>
        <div className="loan-results-row">
          <div>Monthly Payment:</div>
          <div><NumberFormat value={Math.ceil(calculated.monthlyPayment)} displayType={'text'} thousandSeparator={true} suffix={' NOK'} /></div>
        </div>
        <div className="loan-results-row">
          <div>Total Payment:</div>
          <div><NumberFormat value={Math.ceil(calculated.totalPayment)} displayType={'text'} thousandSeparator={true} suffix={' NOK'} /></div>
        </div>
        <div className="loan-results-row">
          <div>Total Interest:</div>
          <div><NumberFormat value={Math.ceil(calculated.totalInterest)} displayType={'text'} thousandSeparator={true} suffix={' NOK'} /></div>
        </div>

      </div>
    </>
  );
}
