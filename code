import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function SolarSavingsApp() {
  // ===== Inputs =====
  const [bill, setBill] = useState("");
  const [noSunDays, setNoSunDays] = useState(0);
  const [daytime, setDaytime] = useState(false);
  const [location, setLocation] = useState("Johor Bahru");
  const [panels, setPanels] = useState(20);

  // ===== Outputs =====
  const [results, setResults] = useState(null);

  // PDF ref
  const reportRef = useRef();

  const handleCalculate = () => {
    if (!bill || isNaN(bill) || Number(bill) <= 0) {
      alert("⚠️ Please enter a valid bill amount.");
      return;
    }

    // Fake calculation (replace with your logic)
    const billNum = Number(bill);
    const consumption = billNum * 4; // e.g. conversion factor
    const savings = billNum * 0.6; // assume 60% saving
    const payback = (billNum * 36) / (panels * 1000);

    setResults({
      consumption,
      previousBill: billNum,
      newBill: billNum - savings,
      savings,
      payback: payback.toFixed(1),
      roi: ((savings * 12) / (panels * 1000)).toFixed(2),
    });
  };

  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("solar_savings_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">☀️ Solar Savings Calculator</h1>

      {/* ===== Inputs Section ===== */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Inputs</h2>

        <label className="block mb-2">
          Monthly Electricity Bill (MYR):
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          No-sun Days:
          <select
            value={noSunDays}
            onChange={(e) => setNoSunDays(Number(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          >
            <option value={0}>0</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
        </label>

        <label className="block mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={daytime}
            onChange={(e) => setDaytime(e.target.checked)}
          />
          Enable daytime consumption (20%)
        </label>

        <label className="block mb-2">
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option>Johor Bahru</option>
            <option>BP/Muar</option>
            <option>Kuala Lumpur</option>
            <option>North</option>
          </select>
        </label>

        <label className="block mb-2">
          Number of Panels: {panels}
          <input
            type="range"
            min={10}
            max={40}
            step={1}
            value={panels}
            onChange={(e) => setPanels(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <button
          onClick={handleCalculate}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {/* ===== Outputs Section ===== */}
      {results && (
        <div
          ref={reportRef}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl"
        >
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">Consumption</p>
              <p className="font-bold">{results.consumption} kWh/month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">Previous Bill</p>
              <p className="font-bold">RM {results.previousBill}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">New Bill</p>
              <p className="font-bold">RM {results.newBill.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">Savings</p>
              <p className="font-bold">RM {results.savings.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">Payback (years)</p>
              <p className="font-bold">{results.payback}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-gray-500">ROI</p>
              <p className="font-bold">{results.roi}</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded mt-6 hover:bg-green-700"
          >
            📄 Download Report
          </button>
        </div>
      )}
    </div>
  );
}
