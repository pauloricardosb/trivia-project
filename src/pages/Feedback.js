import React from "react";
import { connect } from "react-redux";
import md5 from "crypto-js/md5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles/Feedback.css";

class Feedback extends React.Component {
  updateRanking = () => {
    const { userName, score, userEmail } = this.props;
    const urlPicture = `https://www.gravatar.com/avatar/${userEmail}`;
    const currentStore = localStorage.getItem("ranking") || [];
    const arrayCurrentStore =
      typeof currentStore === "string" ? JSON.parse(currentStore) : [];
    const newStore = [
      ...arrayCurrentStore,
      {
        name: userName,
        score,
        picture: urlPicture,
      },
    ];
    const newStoreString = JSON.stringify(newStore);
    localStorage.setItem("ranking", newStoreString);
  };

  render() {
    const { userEmail, userName, score, assertions } = this.props;
    const gravatarEmail = md5(userEmail).toString();
    const three = 3;
    return (
      <main>
        <header>
          <img
            id="feedback-avatar"
            className="position-absolute top-0 start-50 translate-middle-x"
            alt="Foto de perfil"
            src={`https://www.gravatar.com/avatar/${gravatarEmail}`}
            data-testid="header-profile-picture"
          />
          <div>
            <span
              className="position-absolute top-0 start-50 translate-middle-x"
              id="player-name"
              data-testid="header-player-name"
            >
              {userName}
            </span>
            <span
              className="position-absolute top-50 start-0 translate-middle-y"
              id="score"
              data-testid="header-score"
            >{`${score} points`}</span>
          </div>
        </header>
        <section>
          <span
            id="feedback"
            className="position-absolute top-0 start-50 translate-middle-x"
            data-testid="feedback-text"
          >
            {assertions < three ? "Could be better..." : "Well Done! "}
          </span>
          <p
            data-testid="feedback-total-question"
            className="position-absolute top-50 end-0 translate-middle-y"
            id="assertions"
          >{`${assertions} assertions`}</p>
        </section>
        <div
          id="btn-div"
          className="position-absolute bottom-0 start-50 translate-middle-x"
        >
          <Link to="/">
            <button
              id="play-again"
              type="button"
              data-testid="btn-play-again"
              className="btn btn-outline-primary"
            >
              Play again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="btn btn-outline-dark"
              type="button"
              data-testid="btn-ranking"
              onClick={this.updateRanking}
            >
              Ranking
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  removeUser: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
