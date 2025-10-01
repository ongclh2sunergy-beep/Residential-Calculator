// src/SolarSavingsApp.jsx
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Sun, Package, BarChart, Wrench } from "lucide-react";

export default function SolarSavingsApp() {
  const [bill, setBill] = useState("");
  const [panels, setPanels] = useState(10);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const billAmount = parseFloat(bill) || 0;

    // Dummy formulas (replace with real later)
    const consumption = billAmount * 1.6;
    const newBill = 0;
    const paybackCash = 5.57;
    const paybackCC = 6.16;

    setResults({
      consumption,
      billAmount,
      newBill,
      paybackCash,
      paybackCC,
      panelsNeeded: 4,
      packageQty: panels,
      savingPerPV: 28.03,
      installedKwp: panels * 0.615,
    });
  };

  const handleDownload = async () => {
    const input = document.getElementById("results-section");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("solar-report.pdf");
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="text-yellow-500" />
            <h1 className="text-2xl font-bold">Solar Savings Calculator</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src="https://via.placeholder.com/200x200.png?text=Logo"
              alt="Logo"
              className="rounded-lg shadow"
            />
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">
                Monthly Electricity Bill (MYR):
              </label>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 mb-3 focus:ring-2 focus:ring-green-500"
                placeholder="e.g. 123"
              />
              <button
                onClick={handleCalculate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* Panel Selection */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-orange-500" />
            <h2 className="text-xl font-semibold">
              Solar Panel Package Selection
            </h2>
          </div>

          <label className="block text-sm mb-2">
            Number of panels: <span className="font-semibold">{panels}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={panels}
            onChange={(e) => setPanels(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
        </div>

        {/* Results */}
        {results && (
          <div id="results-section" className="space-y-6">

            {/* Key Metrics */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="text-blue-500" />
                <h2 className="text-xl font-semibold">Key Metrics</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Consumption" value={`${results.consumption.toFixed(2)} kWh`} />
                <MetricCard label="Previous Bill" value={`RM ${results.billAmount.toFixed(2)}`} />
                <MetricCard label="New Bill" value={`RM ${results.newBill.toFixed(2)}`} />
                <MetricCard label="Payback (CC)" value={`${results.paybackCC} yrs`} />
                <MetricCard label="Payback (Cash)" value={`${results.paybackCash} yrs`} />
              </div>
            </div>

            {/* Panel Summary */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="text-purple-500" />
                <h2 className="text-xl font-semibold">Panel & Savings Summary</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Panels Needed" value={`${results.panelsNeeded} panels`} />
                <MetricCard label="Package Qty" value={`${results.packageQty} panels`} />
                <MetricCard label="Saving per PV" value={`RM ${results.savingPerPV}`} />
                <MetricCard label="Installed kWp" value={`${results.installedKwp.toFixed(2)} kWp`} />
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Small metric card component
function MetricCard({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg text-center shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}
