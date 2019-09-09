import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { reaction } from "mobx";

@inject("app", "auth")
@observer
class Reactor extends Component {
  componentDidMount() {
    reaction(
      () => this.props.app.isAppReady && this.props.auth.isLoggedIn,
      both => {
        const isAppReady = this.props.app.isAppReady;
        const isLoggedIn = this.props.auth.isLoggedIn;
        const user = this.props.auth.user;
        const token = this.props.auth.token;
        if (isLoggedIn && isAppReady) {
        } else {
          /*
                if (this.props.notifications.socket) {
                  this.props.notifications.closeSocket()
                }
                */
        }
      }
    );
  }

  componentWillUnmount() {
    // Run even when the isLoggedIn state does not change.
    if (this.props.auth && this.props.auth.socket) {
      //this.props.tasks.closeSocket();
    }
  }

  render() {
    return null;
  }
}

export default Reactor;
