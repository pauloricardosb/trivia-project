import React from "react";
import { Link } from "react-router-dom";
import "./styles/Ranking.css";

class Ranking extends React.Component {
  state = {
    rankingList: [],
  };

  componentDidMount() {
    const storedRanking = localStorage.getItem("ranking") || [];
    const parsedRanking =
      typeof storedRanking === "string" ? JSON.parse(storedRanking) : [];
    this.setState({
      rankingList: parsedRanking,
    });
  }

  render() {
    const { rankingList } = this.state;
    return (
      <div>
        <h1
          id="ranking-tile"
          className="position-absolute top-0 start-50 translate-middle-x"
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <Link to="/">
          <button
            id="home-btn"
            className="position-absolute top-0 end-0 btn btn-dark"
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
        <section>
          <ul
            className="list-group position-absolute bottom-0 start-50 translate-middle-x"
            id="list"
          >
            {rankingList.length > 0 &&
              rankingList
                .sort((a, b) => b.score - a.score)
                .map((ranking, index) => (
                  <li
                    className="list-group-item"
                    key={index}
                    data-testid="ranking-item"
                  >
                    <img
                      id="player-pic"
                      src={ranking.picture}
                      alt={ranking.name}
                    />
                    <span
                      id="player"
                      className="position-absolute top-50 start-50 translate-middle"
                      data-testid={`player-name-${index}`}
                    >
                      {ranking.name}
                    </span>
                    <span
                      id="score-player"
                      className="position-absolute top-50 end-0 translate-middle-y"
                      data-testid={`player-score-${index}`}
                    >
                      {ranking.score}
                    </span>
                  </li>
                ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default Ranking;
