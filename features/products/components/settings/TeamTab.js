import React, { Component } from "react";
import TeamSelector from "../TeamSelector";
import { updateTeam } from "~/lib/products";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { loadingClass } from "../../../../lib/utils/random";
import isFunction from "lodash/isFunction";

export default class TeamTab extends Component {
    state = {
        updating: false,
        team: [],
        errorMessages: null
    };

    onAddTeamMember = team => {
        this.setState({ team });
    };

    onSubmit = async () => {
        try {
            this.setState({ updating: true });
            const product = await updateTeam(
                this.props.product.slug,
                this.state.team // if array of users
            );

            this.setState({ updating: false, errorMessages: null });

            if (isFunction(this.props.onFinish)) {
                this.props.onFinish(product);
            }
        } catch (e) {
            this.setState({
                updating: false,
                errorMessages: e.field_errors || e.message
            });
        }
    };

    render() {
        if (!this.props.isOwner) {
            return (
                <div className="alert is-warning">
                    <div className="alert-body">
                        Only owners can change team settings.
                    </div>
                </div>
            );
        }

        return (
            <div>
                <ErrorMessageList fieldErrors={this.state.errorMessages} />
                <form>
                    <div className="control">
                        <label>
                            Add your team (optional)
                            <p className="help">
                                Add your team usernames and combine your logs!
                            </p>
                        </label>
                        <TeamSelector
                            product={this.props.product}
                            onChange={this.onAddTeamMember}
                        />
                    </div>
                    <hr />
                    <div className="control">
                        <button
                            onClick={e => {
                                e.preventDefault();
                                this.onSubmit();
                            }}
                            className={loadingClass(
                                "btn btn-secondary",
                                this.state.updating
                            )}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
