import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../trivia.png";
import { saveUserAction } from "../redux/action";
import "./styles/Login.css";

class Login extends React.Component {
  state = {
    userName: "",
    email: "",
  };

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  isButtonDisabled = () => {
    const { userName, email } = this.state;
    if (userName.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  };

  onHandleClick = async () => {
    const { saveUser, history } = this.props;
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    const data = await response.json();
    localStorage.setItem("token", data.token);
    saveUser(this.state);
    history.push("/game");
  };

  render() {
    const { userName, email } = this.state;
    const { onHandleChange, isButtonDisabled, onHandleClick } = this;
    const { history } = this.props;
    return (
      <div>
        <div>
          <img
            src={logo}
            id="trivia-logo"
            className="App-logo img-fluid position-absolute top-50 start-50 translate-middle"
            alt="logo"
          />
        </div>
        <section>
          <form
            className="position-absolute top-100 start-50 translate-middle"
            id="login-form"
          >
            <div>
              <label htmlFor="name" className="form-label">
                Nome:
                <input
                  className="form-control"
                  placeholder="Digite seu nome"
                  id="name"
                  name="userName"
                  type="text"
                  value={userName}
                  onChange={onHandleChange}
                  data-testid="input-player-name"
                />
              </label>
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email:
                <input
                  className="form-control"
                  placeholder="Digite seu email"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onHandleChange}
                  data-testid="input-gravatar-email"
                />
              </label>
            </div>
            <div id="play-btn-div">
              <button
                type="button"
                disabled={isButtonDisabled()}
                data-testid="btn-play"
                onClick={onHandleClick}
                className="btn btn-light"
              >
                PLAY
              </button>
            </div>
          </form>
          <button
            id="config-btn"
            data-testid="btn-settings"
            type="button"
            onClick={() => history.push("/settings")}
            className="btn btn-dark position-absolute top-0 end-0"
          >
            Configurações
          </button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(saveUserAction(state)),
});

Login.propTypes = {
  saveUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
