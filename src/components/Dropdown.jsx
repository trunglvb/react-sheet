import React from "react";
// import { v4 as uuidv4 } from "uuid";


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
		{
			key: "histogram",
			name: "histogram",
		},
		{
			key: "area",
			name: "area",
		},
		{
			key: "networkChart",
			name: "networkChart",
		},
		{
			key: "heatmap",
			name: "heatmap",
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
				{(	props.selectedOptionKey === "pie" ||
					props.selectedOptionKey === "columnchart" ||
					props.selectedOptionKey === "area" ) && (
					<>
						<div className="chart">
							<label htmlFor="chart">Label</label>
							<select
								id="chart"
								value={props.labelColumn}
								onChange={(e) => {
									props.setLableColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} >
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="chart">
							<label htmlFor="chart">Value</label>
							<select
								value={props.valueColumn}
								id="chart"
								onChange={(e) => {
									props.setValueColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} >
										{item}
									</option>
								))}
							</select>
						</div>
					</>
				)}
				{(props.selectedOptionKey === "chartxy" || props.selectedOptionKey === "histogram" )&& (
					<div className="chart">
						<label htmlFor="chartxy">Value</label>
						<select
							value={props.valueColumn}
							id="chartxy"
							onChange={(e) => {
								props.setValueColumn(e.target.value);
							}}
						>
							{props.listInput.map((item) => (
								<option value={item} >
									{item}
								</option>
							))}
						</select>
					</div>
				)}
				{props.selectedOptionKey === "heatmap"  && (
					<>
						<div className="chart">
							<label htmlFor="pie">group</label>
							<select
								id="pie"
								value={props.groupColumn}
								onChange={(e) => {
									props.setGroupColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} >
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="chart">
							<label htmlFor="pie">Label</label>
							<select
								id="pie"
								value={props.labelColumn}
								onChange={(e) => {
									props.setLableColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} >
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="chart">
							<label htmlFor="chart">Value</label>
							<select
								value={props.valueColumn}
								id="chart"
								onChange={(e) => {
									props.setValueColumn(e.target.value);
								}}
							>
								{props.listInput.map((item) => (
									<option value={item} >
										{item}
									</option>
								))}
							</select>
						</div>
					</>
				)}
			</div>
			
			<button onClick={() => props.exportData()}>SHOW</button>
		</div>
	);
};


export default Dropdown;
