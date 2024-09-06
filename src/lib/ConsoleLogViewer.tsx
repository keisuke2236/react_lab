import { useEffect, useState } from "react";

export const ConsoleLogViewer: React.FC = () => {
	const [logs, setLogs] = useState<string[]>([]);
	const [width, setWidth] = useState<string>("600px");
	const widthList = ["1000px", "800px", "600px", "400px", "200px"];

	const WidthChangeButton: React.FC<{ width: string }> = ({ width }) => (
		<button onClick={() => setWidth(width)} className="mb-2 p-1 pt-0 pb-0 mr-1">
			{width}
		</button>
	);

	useEffect(() => {
		const originalConsoleLog = console.log;
		console.log = (...args: any[]) => {
			setLogs((prevLogs) => [
				...prevLogs,
				args
					.map((arg) =>
						typeof arg === "object" ? JSON.stringify(arg) : String(arg),
					)
					.join(" "),
			]);
			originalConsoleLog.apply(console, args);
		};

		return () => {
			console.log = originalConsoleLog;
		};
	}, []);

	return (
		<div
			className="fixed top-0 right-0 h-full bg-gray-500 p-2 overflow-auto"
			style={{ width }}
		>
			<h2 className="text-lg font-bold mb-2">Console Logs</h2>
			{widthList.map((width) => (
				<WidthChangeButton key={width} width={width} />
			))}
			<div className="rounded-md bg-black mb-2 p-2">
				{logs.map((log, index) => (
					<div key={index} className="mb-1 font-mono text-sm">
						{log}
					</div>
				))}
			</div>
		</div>
	);
};
