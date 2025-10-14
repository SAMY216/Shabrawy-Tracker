import { useEffect, useState } from "react";
import { allRounds, themeColors, allMonths } from "./utils/data";

export default function App() {
  const [month, setMonth] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    let result = allRounds;

    if (month !== "") {
      result = allRounds
        .map((std) => ({
          ...std,
          rounds: std.rounds.filter((rnd) => rnd.month === month),
        }))
        .filter((std) => std.rounds.length > 0);
    }

    if (searchItem.trim() !== "") {
      const searchLower = searchItem.toLowerCase();

      result = result
        .map((std) => ({
          ...std,
          rounds: std.rounds.filter(
            (rnd) =>
              std.student.toLowerCase().includes(searchLower) ||
              rnd.department.toLowerCase().includes(searchLower)
          ),
        }))
        .filter(
          (std) =>
            std.student.toLowerCase().includes(searchLower) ||
            std.rounds.length > 0
        );
    }

    setRounds(result);
  }, [searchItem, month]);

  return (
    <div className="w-full h-full bg-gray-300 px-4 md:px-10 lg:px-14 min-h-[100vh]">
      {/* Header */}
      <div className="w-full text-center md:text-left py-4 md:py-8 lg:py-12">
        <h1 className="w-fit text-2xl md:text-3xl lg:text-4xl font-bold text-sky-600 hover:text-sky-800 transition cursor-pointer">
          Shabrawy Tracker
        </h1>
      </div>

      {/* Search inputs */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 justify-center items-center">
        {/* Search by Month */}
        <div className="bg-white rounded-lg p-4 w-fit flex flex-col gap-4 items-center">
          <label
            htmlFor="month"
            className="font-medium text-lg md:text-xl lg:text-2xl"
          >
            Search By Month
          </label>
          <select
            id="month"
            className="input-pattern text-base md:text-lg lg:text-xl"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">-- All Months --</option>
            {allMonths.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        {/* Search By Department or Name */}
        <div className="bg-white rounded-lg p-4 w-fit flex flex-col gap-4 items-center">
          <label
            htmlFor="search-item"
            className="font-medium text-lg md:text-xl lg:text-2xl"
          >
            Search
          </label>
          <input
            id="search-item"
            type="text"
            placeholder="Name or Department"
            className="input-pattern text-base md:text-lg lg:text-xl"
            value={searchItem}
            onChange={(e) => {
              if (e.target.value.length > 25) return;
              setSearchItem(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Cards */}
      {rounds.length >= 1 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 text-lg md:text-xl lg:text-2xl py-6">
          {rounds.map((student) => (
            <>
              {student.rounds?.map((round, index) => (
                <div
                  key={index}
                  className={`${
                    themeColors[student.theme] || "bg-gray-600"
                  } rounded-lg p-4 overflow-hidden text-slate-800 font-medium`}
                >
                  <p className="text-right">{student.student}</p>
                  <p>{round.month}</p>
                  <p className="text-center">{round.department}</p>
                </div>
              ))}
            </>
          ))}
        </div>
      ) : (
        <p className="text-base md:text-lg lg:text-xl font-bold text-center mt-8">
          No Rounds Found...
        </p>
      )}
    </div>
  );
}
