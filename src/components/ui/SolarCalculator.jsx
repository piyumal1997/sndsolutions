// src/components/ui/SolarCalculator.jsx
// Updated: Manual phase only, same cost per kW, informative note for >5kW
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlug,
  faBolt,
  faSolarPanel,
  faMoneyBillWave,
  faPiggyBank,
  faCalendarAlt,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const SolarCalculator = () => {
  const [bill, setBill] = useState(20000);
  const [phase, setPhase] = useState('single'); // only manual
  const [option, setOption] = useState('financed');
  const [term, setTerm] = useState(5);
  const [rate, setRate] = useState(8.0);
  const [results, setResults] = useState(null);

  const calculateSavings = () => {
    if (isNaN(bill) || bill < 5000) {
      alert('Please enter a valid monthly bill of at least 5,000 LKR.');
      return;
    }

    // ────────────────────────────────────────────────
    // Fixed assumptions (same cost per kW for both phases)
    // ────────────────────────────────────────────────
    const AVERAGE_RATE_PER_UNIT   = 50;
    const UNITS_PER_KW_MONTH      = 125;
    const COST_PER_KW             = 575000; // same for single & three phase

    const units       = Math.round(bill / AVERAGE_RATE_PER_UNIT);
    const kwNeeded    = Math.ceil(units / UNITS_PER_KW_MONTH);
    const totalCost   = kwNeeded * COST_PER_KW;
    const annualSavings = bill * 12;
    const paybackYears  = (totalCost / annualSavings).toFixed(1);

    const phaseDisplay = phase === 'single' ? 'Single Phase' : 'Three Phase';

    // Informative note when system size > 5 kW
    let phaseNote = '';
    if (kwNeeded > 5 && phase === 'single') {
      phaseNote = `Note: A ${kwNeeded} kW system typically requires a three-phase connection for optimal performance and load balancing. You selected single-phase, which may limit system size or require upgrades.`;
    } else if (kwNeeded > 5) {
      phaseNote = `Note: Your recommended ${kwNeeded} kW system is suitable for three-phase connection.`;
    } else {
      phaseNote = `Note: Single-phase is sufficient for systems 5 kW or below.`;
    }

    const common = {
      units: units.toLocaleString() + ' units',
      kw: kwNeeded + ' kW',
      cost: 'Rs. ' + Math.round(totalCost).toLocaleString(),
      payback: paybackYears + ' years',
      phase: phaseDisplay,
      note: phaseNote,
    };

    let calculatedResults;
    if (option === 'financed') {
      const monthlyRate = rate / 100 / 12;
      const months = term * 12;
      const emi = monthlyRate === 0
        ? totalCost / months
        : totalCost * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

      const monthlySavings = bill - emi;

      calculatedResults = {
        type: 'financed',
        ...common,
        emi: 'Rs. ' + Math.round(emi).toLocaleString(),
        savings: monthlySavings > 0 ? 'Rs. ' + Math.round(monthlySavings).toLocaleString() : 'Rs. ' + Math.round(-monthlySavings).toLocaleString(),
        savingsPositive: monthlySavings > 0,
      };
    } else {
      calculatedResults = {
        type: 'cash',
        ...common,
        savings: Math.round(bill).toLocaleString(),
      };
    }

    setResults(calculatedResults);
  };

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto relative">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Solar Savings & Loan Calculator
      </h1>
      <p className="text-center text-base md:text-lg text-gray-600 mb-10">
        Estimate your potential savings with a financed or cash solar system in Sri Lanka.
      </p>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
        {/* Monthly Bill */}
        <div>
          <label htmlFor="bill" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
            Current Monthly Electricity Bill (LKR)
          </label>
          <input
            type="number"
            id="bill"
            min="5000"
            value={bill}
            onChange={(e) => setBill(parseFloat(e.target.value))}
            placeholder="e.g. 20000"
            className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Phase Selection – Manual only */}
        <div className="flex flex-col items-center border-1 border-gray-300 rounded-lg p-4">
          <label className="text-base md:text-lg font-semibold text-gray-700 mb-4">
            Current Electricity Connection Phase
          </label>
          <div className="flex items-center justify-center space-x-8">
            <span className="text-lg font-medium text-gray-600">Single Phase</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={phase === 'three'}
                onChange={() => setPhase(phase === 'single' ? 'three' : 'single')}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-blue-600 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span className="text-lg font-medium text-gray-600">Three Phase</span>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Select your current home connection type.
          </p>
        </div>

        {/* Installation Option */}
        <div className="flex flex-col items-center border-1 border-gray-300 rounded-lg p-4">
          <label className="text-base md:text-lg font-semibold text-gray-700 mb-4">
            Installation Option
          </label>
          <div className="flex items-center justify-center space-x-8">
            <span className="text-lg font-medium text-gray-600">Cash Purchase</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={option === 'financed'}
                onChange={() => setOption(option === 'cash' ? 'financed' : 'cash')}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-400 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span className="text-lg font-medium text-gray-600">Financed</span>
          </div>
        </div>

        {/* Loan fields */}
        {option === 'financed' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="term" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <select
                id="term"
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value))}
                className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              >
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>

            <div>
              <label htmlFor="rate" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                id="rate"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                placeholder="e.g. 0 for 0% plans, 8 for bank loans"
                className="w-full px-4 py-3 md:py-4 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        )}

        <button
          onClick={calculateSavings}
          className="w-full mt-8 py-4 md:py-5 bg-green-600 hover:bg-green-700 text-white font-bold text-lg md:text-xl rounded-lg shadow-md transition transform hover:scale-105"
        >
          Calculate Savings
        </button>
      </div>

      {/* Results – Grid Cards with Icons */}
      {results && (
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            {results.type === 'financed' ? 'Financed Option (With Loan)' : 'Cash Purchase Option (Loan-Free)'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Connection Type */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faPlug} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">Connection Type</p>
              <p className="text-xl font-bold">{results.phase}</p>
            </div>

            {/* 2. Estimated Consumption */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faBolt} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">Estimated Consumption</p>
              <p className="text-xl font-bold">{results.units}</p>
            </div>

            {/* 3. Recommended System Size */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faSolarPanel} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">System Size</p>
              <p className="text-xl font-bold">{results.kw}</p>
            </div>

            {/* 4. Cost */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">
                {results.type === 'financed' ? 'Total System Cost' : 'Upfront Cost'}
              </p>
              <p className="text-xl font-bold">{results.cost}</p>
            </div>

            {/* 5. Savings or EMI */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faPiggyBank} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">
                {results.type === 'financed' ? 'Monthly EMI' : 'Immediate Monthly Savings'}
              </p>
              <p className={`text-xl font-bold ${results.savingsPositive ? 'text-green-600' : 'text-red-600'}`}>
                {results.type === 'financed' ? results.emi : `Rs. ${results.savings}`}
              </p>
            </div>

            {/* 6. Payback Period */}
            <div className="bg-gray-50 rounded-lg p-5 text-center shadow-md">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 text-4xl mb-3" />
              <p className="text-sm text-gray-600 font-medium">Payback Period</p>
              <p className="text-xl font-bold">{results.payback}</p>
            </div>

            {/* Note – full width */}
            {results.note && (
              <div className="bg-orange-50 rounded-lg p-5 text-center shadow-md md:col-span-3">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-orange-600 text-4xl mb-3" />
                <p className="text-sm text-gray-600 font-medium">Important Note</p>
                <p className="text-lg font-semibold text-orange-700">{results.note}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assumptions */}
      <div className="mt-12 bg-gray-100 rounded-2xl p-6 md:p-8 text-sm md:text-base text-gray-600">
        <strong className="block mb-3 text-lg text-gray-800">Assumptions (Sri Lanka market ~2026):</strong>
        <ul className="list-disc list-inside space-y-2">
          <li>Average effective electricity rate: 50 LKR/unit</li>
          <li>Average monthly production: 125 units per kW (Colombo/Western Province)</li>
          <li>Cost per kW: ~575,000 LKR (same for single & three phase)</li>
          <li>System sized to fully offset your bill</li>
          <li>Fixed charges & connection fees ignored for simplicity</li>
        </ul>
        <p className="mt-6">
          This is an estimate only. Actual costs, production, and suitability vary by provider, roof, and connection type.
        </p>
      </div>
    </div>
  );
};

export default SolarCalculator;