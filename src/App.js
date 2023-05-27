import { DataSheetGrid, textColumn, keyColumn } from "react-datasheet-grid";
import { useState } from "react";
import "react-datasheet-grid/dist/style.css";
import Dropdown from "./components/Dropdown";
import "./App.css";

const App = () => {
	const [data, setData] = useState([{}, {}, {}, {}]);
	const dataFilter = data.filter((value) => Object.keys(value).length !== 0);
	const [labelColumn, setLableColumn] = useState();
	const [valueColumn, setValueColumn] = useState();
	const [selectedOptionKey, setSelectedOptionKey] = useState("pie");
	const [list, setList] = useState([]);
	const exportData = () => {
		console.log("selectedOptionKey", selectedOptionKey);
		console.log("dataFilter", dataFilter);
		console.log("labelColumn", labelColumn);
		console.log("valueColumn", valueColumn);
	};
	const columns = [
		{ ...keyColumn("A", textColumn), title: "A" },
		{ ...keyColumn("B", textColumn), title: "B" },
		{ ...keyColumn("C", textColumn), title: "C" },
		{ ...keyColumn("D", textColumn), title: "D" },
		{ ...keyColumn("E", textColumn), title: "E" },
		{ ...keyColumn("F", textColumn), title: "F" },
		{ ...keyColumn("G", textColumn), title: "G" },
		{ ...keyColumn("H", textColumn), title: "H" },
		{ ...keyColumn("I", textColumn), title: "I" },
		{ ...keyColumn("J", textColumn), title: "J" },
		{ ...keyColumn("K", textColumn), title: "K" },
		{ ...keyColumn("L", textColumn), title: "L" },
		{ ...keyColumn("M", textColumn), title: "M" },
		{ ...keyColumn("N", textColumn), title: "H" },
		{ ...keyColumn("O", textColumn), title: "O" },
		{ ...keyColumn("U", textColumn), title: "U" },
	];

	const listInput = dataFilter.map((item) => Object.keys(item)).flat();

	return (
		<div className="wrapper">
			<div className="sheet">
				<DataSheetGrid
					value={data}
					onChange={(data) => setData(data)}
					columns={columns}
				/>
			</div>
			<div className="flex">
				<div className="dropdown">
					<Dropdown
						listInput={[...new Set(listInput)]}
						data={dataFilter}
						exportData={exportData}
						setLableColumn={setLableColumn}
						setValueColumn={setValueColumn}
						setSelectedOptionKey={setSelectedOptionKey}
						selectedOptionKey={selectedOptionKey}
					/>
				</div>
				<div className="data-chart"></div>
			</div>
		</div>
	);
};

export default App;
