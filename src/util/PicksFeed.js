import Config from './Config'

export const getPicks = async () => {
	const res = await fetch(`${Config.picksUrl}/players`)

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}

	const json = await res.json()
	return json.data.filter(p => p.picker !== "")
}
