import React from 'react';
import Spinner from "components/Spinner";
import {getProductStats} from "../../../lib/products";

class ProductStatsContainer extends React.Component {
	state = {
		isLoading: true,
		ready: false,
		failed: false,
		stats: null,
	}

	componentDidMount() {
		this.fetchStats();
	}

	fetchStats = async () => {
		try {
			let stats = await getProductStats(this.props.slug);
			this.setState({isLoading: false, ready: true, failed: false, stats: stats})
		} catch (e) {
			this.setState({isLoading: false, failed: true})
		}
	}

	render() {
		if (this.state.ready && this.state.stats && !this.state.failed) {
			let Component = this.props.component;
			let propName = this.props.propName ? this.props.propName : 'stats';
			let props = {};
			props[propName] = this.state.stats;
			return <Component {...props} />
		} else if (this.state.failed) {
			return <div>Failed to load stats. <button onClick={this.fetchStats}>Retry</button></div>
		} else {
			// todo: login to do follow cta?
			return <Spinner small={true} text={"Loading..."}/>;
		}
	}
}

ProductStatsContainer.propTypes = {}

export default ProductStatsContainer;