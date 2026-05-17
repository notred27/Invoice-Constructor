type PartyProps = {
	label: string;
	value: {
		name: string;
		email: string;
		address: string;
	};
	onChange: (value: PartyProps["value"]) => void; // Parent callback to update state
};


export function PartyForm({ label, value, onChange }: PartyProps) {
	return (
		<div>
			<p>{label}</p>

			<input
				placeholder="Name"
				value={value.name}
				onChange={(e) =>
					onChange({ ...value, name: e.target.value })
				}
			/>

			<input
				placeholder="Email"
				value={value.email}
				onChange={(e) =>
					onChange({ ...value, email: e.target.value })
				}
			/>

			<input
				placeholder="Address"
				value={value.address}
				onChange={(e) =>
					onChange({ ...value, address: e.target.value })
				}
			/>
		</div>
	);
}