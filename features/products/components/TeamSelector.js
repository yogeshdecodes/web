import React from 'react';
import {getProductPeople} from 'lib/products';
import {getByUsername} from "lib/user";
import uniqBy from "lodash-es/uniqBy";
import {UserMediaList, withCurrentUser} from "features/users";
import Spinner from "components/Spinner";

class UserGroupSelector extends React.Component {
    state = {
        loading: true,
        adding: false,
        value: '',
        team: [],
        failed: false,
        errorMessages: null,
    }

    async componentDidMount() {
        if (this.props.product && this.props.onChange) {
            try {
                const people = await getProductPeople(this.props.product.slug);
                this.setState({ loading: false, team: [...people.filter(u => this.props.product.user !== u.id)] })
                // Remove owner from list
            } catch (e) {

            }
        } else {
            this.setState({ loading: false })
        }
    }

    addUser = async (e) => {
        if (e) {
            e.preventDefault()
        }
        this.setState({
            adding: true,
            errorMessages: null,
        })
        try {
            if (this.props.me.username === this.state.value) {
                throw new Error("Nice try, but you can't add yourself as a team member.")
            }
            const user = await getByUsername(this.state.value);
            const newState = uniqBy([...this.state.team, user], 'id')
            this.setState({
                adding: false,
                value: '',
                team: newState,
                errorMessages: null,
            })
            if (this.props.onChange && newState.length) {
                this.props.onChange(newState.map(u => u.id))
            }
        } catch (e) {
            this.setState({
                adding: false,
                failed: true,
                errorMessages: e.field_errors || e.message
            })
        }
    }

    renderErrorMessages = () => {
        let messages = [];
        let errors = this.state.errorMessages;
        if (typeof errors === 'object') {
            for (let key in errors) {
                messages.push(
                    <p>
                        <strong>{key.replace(/[_-]/g, " ")}</strong>: {errors[key]}
                    </p>
                )
            }
        } else if (errors.constructor === Array) {
            errors.map((err) => {
                messages.push(
                    <p>{err}</p>
                )

                return true;
            })
        } else {
            messages = this.state.errorMessages;
        }

        return messages
    }

    render() {
        if (this.state.loading) return <Spinner small />;

        return (
            <>
                {this.state.team.length === 0 &&
                    <>
                        <div className={"label has-text-centered"}>
                            Add your team and create a unified task log for your product.
                        </div>
                        <br />
                    </>
                }
				{this.state.errorMessages &&
				<div className={"panel-message danger"}>
					{this.renderErrorMessages()}
				</div>
				}
                <form onSubmit={this.addUser}>
					<div className={"form-row flex col-right stretch"}>
						<div className={false ? "control has-icons-left is-loading" : "control has-icons-left"}>
							<input
								onChange={e => this.setState({value: e.target.value})}
								disabled={this.state.adding}
								value={this.state.value}
								className="input is-medium"
								placeholder="username"/>
							<span className="icon is-medium is-left">
								@
							</span>
						</div>
						<button
							className={"btn"}
							onClick={this.addUser}
							loading={this.state.adding}>
							Add
						</button>
					</div>
                </form>

                <br />
                {this.state.team.length > 0 &&
                    <UserMediaList users={this.state.team} />
                }
            </>
        )
    }
}

export default withCurrentUser(UserGroupSelector)


