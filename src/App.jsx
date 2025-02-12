import { useState, useEffect } from "react";

export default function ConsistencyCalculator() {
  const [profits, setProfits] = useState([]);
  const [newProfit, setNewProfit] = useState("");

  useEffect(() => {
    const savedProfits = JSON.parse(localStorage.getItem("profits"));
    if (savedProfits) setProfits(savedProfits);
  }, []);

  useEffect(() => {
    localStorage.setItem("profits", JSON.stringify(profits));
  }, [profits]);

  const addProfit = () => {
    if (!newProfit || isNaN(newProfit)) return;
    setProfits([...profits, parseFloat(newProfit)]);
    setNewProfit("");
  };

  const resetProfits = () => {
    setProfits([]);
    localStorage.removeItem("profits");
  };

  const bestDay = Math.max(...profits, 0);
  const totalProfit = profits.reduce((acc, curr) => acc + curr, 0);
  const consistencyScore = totalProfit ? ((bestDay / totalProfit) * 100).toFixed(2) : 0;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Consistency Calculator</h1>
      <div className="w-full max-w-md p-4 border rounded-lg shadow-md bg-white">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
              placeholder="Enter daily profit"
              value={newProfit}
              onChange={(e) => setNewProfit(e.target.value)}
            />
            <button onClick={addProfit} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </div>
          <ul className="list-disc pl-5">
            {profits.map((profit, index) => (
              <li key={index}>
                Day {index + 1}: ${profit.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-semibold">Best Trading Day: ${bestDay.toFixed(2)}</p>
          <p className="font-semibold">Total Profit: ${totalProfit.toFixed(2)}</p>
          <p className="font-semibold text-blue-600">
            Consistency Score: {consistencyScore}%
          </p>
          <button onClick={resetProfits} className="bg-red-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
