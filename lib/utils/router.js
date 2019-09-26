function isActive(props, url, original = "") {
	return props.location.pathname === url ? original + ' is-active' : original
}

export {
	isActive
}