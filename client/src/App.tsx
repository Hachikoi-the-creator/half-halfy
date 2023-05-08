import { ChangeEvent, useState } from "react";
import Papa from "papaparse";

type ParsedCsv = Array<String[]>;

export default function App() {
  const [csvFile, setCsvFile] = useState<ParsedCsv>();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return console.error("error detecting file???");

    Papa.parse(file, {
      complete: (results) => {
        //  Array<[name, email, phone]> === [ [-], [-], [-] ]
        results.data.shift(); // first element would the the titles
        setCsvFile(results.data as ParsedCsv);
        console.log(results.data);
      },
      error: (err) => {
        console.log("Error parsing csv file", err);
      },
    });
  };

  return (
    <div>
      <label>
        Enter your file to parse
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </label>
    </div>
  );
}
