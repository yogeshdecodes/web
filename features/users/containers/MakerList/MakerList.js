import React from "react";
import axios from "axios";
import Spinner from "~/components/Spinner";
import { UserMedia } from "~/features/users";
import Tiles, { Tile } from "../../../../components/Tiles";

class MakerList extends React.Component {
    state = {
        ready: false,
        data: [],
        failed: false,
        nextUrl: null,
        allLoaded: false
    };

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async () => {
        let url = "/users/";

        if (this.state.nextUrl) {
            url = this.state.nextUrl;
        }

        try {
            const response = await axios.get(url);

            if (response.data.count === 0 && response.data.next === null) {
                this.setState({ allLoaded: true });
            } else if (response.data.results) {
                this.setState({
                    data: [...this.state.data, ...response.data.results],
                    ready: true,
                    failed: false,
                    nextUrl: response.data.next,
                    allLoaded: response.data.next === null
                });
            }
        } catch (e) {
            this.setState({ failed: true });
        }
    };

    render() {
        return (
            <div className="MakerList">
                {!this.state.ready && (
                    <Spinner text={"Loading top makers..."} />
                )}
                {this.state.ready && this.state.data && !this.state.failed && (
                    <Tiles>
                        {this.state.data.map((user, key) => (
                            <Tile key={key}>
                                <UserMedia user={user} large={true} />
                            </Tile>
                        ))}
                    </Tiles>
                )}
                <>
                    {this.state.ready && !this.state.allLoaded && (
                        <div className={"has-text-centered"}>
                            <button className={"btn"} onClick={this.loadUsers}>
                                Load more makers
                            </button>
                        </div>
                    )}
                </>
            </div>
        );
    }
}

MakerList.propTypes = {};

export default MakerList;
