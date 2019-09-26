import React from 'react';

function chunkify(a, n, balanced) {

	if (n < 2)
		return [a];

	var len = a.length,
		out = [],
		i = 0,
		size;

	if (len % n === 0) {
		size = Math.floor(len / n);
		while (i < len) {
			out.push(a.slice(i, i += size));
		}
    }

    else if (balanced) {
		while (i < len) {
			size = Math.ceil((len - i) / n--);
			out.push(a.slice(i, i += size));
		}
    }

    else {

		n--;
		size = Math.floor(len / n);
		if (len % size === 0)
			size--;
		while (i < size * n) {
			out.push(a.slice(i, i += size));
		}
		out.push(a.slice(size * n));

	}

	return out;
}


export const Tile = (props) => {
	return (
		<div className="tile is-child">
			{props.children}
		</div>
	)
}

class Tiles extends React.Component {

	render() {
		let filler = null;
		if (!this.props.children) return null;
		const childrenArray = React.Children.toArray(this.props.children);

		let columns = childrenArray;

		if (childrenArray.length < this.props.is) {
            const toAdd = this.props.is - childrenArray.length;
            filler = <>{Array(toAdd).fill().map(e => <div className="tile is-parent"></div>)}</>
		} else {
			columns = chunkify(childrenArray, this.props.is, true)
		}

		return (
			<div className="tile is-ancestor">
				{columns.map(c => (
					<div className="tile is-parent is-vertical">
						{c}
					</div>
				))}
				{filler}
			</div>
		)
	}
}

Tiles.defaultProps = {
	is: 3,
	fillEmpty: true,
}

export default Tiles;