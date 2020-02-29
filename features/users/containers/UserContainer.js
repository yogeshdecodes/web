import React from "react";
import PropTypes from "prop-types";
import { getById } from "~/lib/user";
import Spinner from "~/components/Spinner";
import { getByUsername } from "../../../lib/user";
import axios from "~/lib/axios";

class UserContainer extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    fetchUser = async () => {
        this.setState({ loading: true, failed: false });
        try {
            let data = null;
            if (this.props.id) {
                data = await getById(this.props.id);
            } else if (this.props.username) {
                data = await getByUsername(this.props.username);
            } else if (this.props.all) {
                let initial = await axios.get("/users/");
                let next = initial.data.next;
                data = initial.data.results;
                while (next !== null) {
                    let d = await axios.get(next);
                    data = data.concat(d.data.results);
                    next = d.data.next;
                }
            } else {
                throw new Error();
            }
            this.setState({ data: data, loading: false, failed: false });
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true });
        }
    };

    componentDidMount() {
        this.fetchUser();
    }

    render() {
        const Component = this.props.component;

        if (
            this.state.loading ||
            (!this.props.id && !this.props.username && !this.props.all)
        ) {
            return <Spinner small={true} />;
        }

        if (this.state.failed && this.state.loading === false) {
            return (
                <h3 className={"has-text-centered"}>
                    Failed to load user.{" "}
                    <button onClick={() => this.fetchUser()}>Try again.</button>
                </h3>
            );
        } else if (!this.state.loading && !this.state.failed) {
            return <Component user={this.state.data} />;
        }
    }
}

UserContainer.propTypes = {
    id: PropTypes.number.isRequired
};

export default UserContainer;
