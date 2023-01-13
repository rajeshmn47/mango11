import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import styled from "@emotion/styled";
import "./home.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { URL } from "../constants/userConstants";
import {
  PlaylistAddCheckCircleSharp,
  SettingsApplicationsTwoTone,
} from "@mui/icons-material";

const PlayersContainer = styled.div``;
const Player = styled.div`
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  justify-content: space-between;
  img {
    width: 150px !important;
  }
`;
export const Players = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function getupcoming() {
      const data = await axios.get(`${URL}/home`);
      console.log(data);
      setUpcoming(data.data.upcoming.results);
      setLive(data.data.live.results);
      setPast(data.data.past.results);
      setPlayers(data.data.players);
    }
    getupcoming();
  }, []);
  return (
    <>
      <div className="logintopbar">
        <EmojiEventsOutlinedIcon style={{ marginRight: "1vw" }} />
        Dream 11
      </div>
      <div className="stepper">
        <Steppr />
      </div>
      <div className="hometop">
        <div className="hometopicon selectgame">
          <SportsCricketIcon style={{ color: "#C41E22" }} />
          <h5>Cricket</h5>
        </div>
        <div className="hometopicon">
          <SportsSoccerIcon />
          <h5>Football</h5>
        </div>
        <div className="hometopicon">
          <SportsBasketballIcon />
          <h5>Basketball</h5>
        </div>
        <div className="hometopicon">
          <SportsHockeyIcon />
          <h5>Hockey</h5>
        </div>
      </div>
      <div className="matchstatuses">
        <button className="matchstatus">live</button>
        <button className="matchstatus">upcoming</button>
        <button className="matchstatus">completed</button>
      </div>
      <div className="matches">
        {players.length > 0
          ? players.map((u) => (
              <Player>
                <h1>{u.name}</h1>
                <img src={u.image} alt="" />
              </Player>
            ))
          : null}
      </div>
      <Bottomnav />
    </>
  );
};

export default Players;
