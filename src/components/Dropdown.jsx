import React from "react";
import { v4 as uuidv4 } from "uuid";

const Dropdown = (props) => {
	const listOption = [
		{
			key: "pie",
			name: "pie",
		},
		{
			key: "columnchart",
			name: "columnchart",
		},
		{
			key: "chartxy",
			name: "chartxy",
		},
	];

	return (
		<div>
			<div>
				<select
					className="selectList"
					id="optionList"
					onChange={(e) => props.setSelectedOptionKey(e.target.value)}
				>
					{listOption.map((item) => (
						<option value={item.key} key={item.key}>
							{item.name}
						</option>
					))}
				</select>
				{(props.selectedOptionKey === "pie" ||
					props.selectedOptionKey === "columnchart") && (
					<>
						<div className="chart">
							<label htmlFor="pie">Label</label>
							<select
								id="pie"
								onChange={(e) => {
									props.setLableColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} key={uuidv4()}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="chart">
							<label htmlFor="chart">Value</label>
							<select
								id="chart"
								onChange={(e) => {
									props.setValueColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} key={uuidv4()}>
										{item}
									</option>
								))}
							</select>
						</div>
					</>
				)}
				{props.selectedOptionKey === "chartxy" && (
					<div className="chart">
						<label htmlFor="chartxy">Label</label>
						<select
							id="chartxy"
							onChange={(e) => {
								props.setLableColumn(e.target.value);
							}}
						>
							{props.listInput.map((item) => (
								<option value={item} key={uuidv4()}>
									{item}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			<button onClick={() => props.exportData()}>SHOW</button>
		</div>
	);
};

export default Dropdown;
