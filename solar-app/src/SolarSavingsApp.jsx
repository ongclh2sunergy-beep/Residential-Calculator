// src/SolarSavingsApp.jsx
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function SolarSavingsApp() {
  const [bill, setBill] = useState("");
  const [noSunDays, setNoSunDays] = useState(0);
  const [daytimeOnly, setDaytimeOnly] = useState(false);
  const [location, setLocation] = useState("");
  const [panels, setPanels] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const billAmount = parseFloat(bill) || 0;
    const qty = parseInt(panels) || 0;

    // Dummy formulas (replace later with real model)
    const savings = billAmount * 0.35;
    const cost = qty * 1200;
    const roi = (savings * 12) / (cost || 1);
    const co2 = qty * 0.45;

    setResults({
      savings,
      cost,
      roi,
      co2,
      warnings:
        noSunDays > 10
          ? "⚠️ Too many cloudy days may reduce efficiency."
          : null,
    });
  };

  const handleDownload = async () => {
    const input = document.getElementById("results-card");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("solar-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 flex flex-col gap-6 max-w-md mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-green-800">
        🌞 Solar Savings Calculator
      </h1>

      {/* Inputs */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Inputs</h2>

        {/* Monthly Bill */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Monthly Bill (RM)
          </label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 300"
          />
        </div>

        {/* No-sun Days */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            No-Sun Days / Month
          </label>
          <input
            type="number"
            value={noSunDays}
            onChange={(e) => setNoSunDays(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 5"
          />
        </div>

        {/* Daytime toggle */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={daytimeOnly}
            onChange={(e) => setDaytimeOnly(e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-700">Daytime Usage Only</span>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select...</option>
            <option value="kl">Kuala Lumpur</option>
            <option value="penang">Penang</option>
            <option value="jb">Johor Bahru</option>
          </select>
        </div>

        {/* Panels */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Number of Panels
          </label>
          <input
            type="number"
            value={panels}
            onChange={(e) => setPanels(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 10"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition"
        >
          Calculate
        </button>
      </div>

      {/* Outputs */}
      <div id="results-card" className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Results</h2>

        {!results ? (
          <p className="text-gray-500 text-center">
            Enter inputs and tap Calculate.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-3 shadow-sm">
              <p className="font-medium">💰 Estimated Savings</p>
              <p className="text-xl font-bold text-green-700">
                RM {results.savings.toFixed(2)}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 shadow-sm">
              <p className="font-medium">⚡ Estimated Cost</p>
              <p className="text-xl font-bold text-green-700">
                RM {results.cost.toFixed(2)}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 shadow-sm">
              <p className="font-medium">📈 ROI</p>
              <p className="text-xl font-bold text-green-700">
                {(results.roi * 100).toFixed(1)}%
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 shadow-sm">
              <p className="font-medium">🌍 CO₂ Reduction</p>
              <p className="text-xl font-bold text-green-700">
                {results.co2.toFixed(1)} tons/year
              </p>
            </div>

            {results.warnings && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {results.warnings}
              </div>
            )}

            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/250x120.png?text=Solar+Panels"
                alt="Solar Illustration"
                className="rounded-md shadow-md"
              />
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
