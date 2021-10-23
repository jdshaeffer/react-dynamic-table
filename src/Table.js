const Table = ({headers, userData, onSort}) => {
	return (
		<>
			<table>
				<tbody>
					<tr>
						{ headers && headers.map(header => (
							<th key={header.name} onClick={() => onSort(header.name)}>
								{header.name}
							</th>
						)) }
					</tr>
					{ userData.map((data, i) => (
						<tr key={i}>
							<td>{data.city}</td>
							<td>{data.country}</td>
							<td>{data.postcode}</td>
							<td>{data.state}</td>
							<td>{data['street name']}</td>
							<td>{data['street number']}</td>
							<td>{data.timezone}</td>
							<td>{data['timezone offset']}</td>
						</tr>
					)) }
				</tbody>
			</table>
			<p>thanks, have a good day</p>
		</>
	)
}

export default Table