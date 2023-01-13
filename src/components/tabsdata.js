import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants/userConstants";

const ContestsContainer = styled(Grid)``;
const Tabel = styled.div`
  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  td,
  th {
    padding: 10px 10px;
    text-align: center;
  }
`;
const Container = styled.div`
  .MuiTabs-indicator {
    background-color: #ec1801 !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: #000000 !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
  table,
  tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: #ec1801;
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: currentcolor;
    border-color: rgba(0, 0, 0, 0.12);
  }
  th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    font-family: "Open Sans";
    width: 100px;
  }
  td {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 10px;
    font-family: "Open Sans";
    text-align: center;
    width: 100px;
  }
  width: 100%;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
`;

const FreeButton = styled.button`
  background-color: #008a36;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;
const Paragraph = styled.p`
  padding: 15px 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const Left = styled.div``;

const Right = styled.div``;

const LastPanel = styled.div``;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ contest, teams }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container style={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Winnings" {...a11yProps(0)} />
        <Tab label="Leaderboard" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ContestsContainer container item sm={12} xs={12}>
          <First>
            <table>
              <tr>
                <th>Rank</th>
                <th>Winnings</th>
              </tr>
              {contest &&
                contest.prizeDetails.map((p, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>₹{p.prize}</td>
                  </tr>
                ))}
            </table>
          </First>
        </ContestsContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paragraph>View all the teams after contest deadline</Paragraph>
        <LastPanel></LastPanel>
        <Tabel>
          <table>
            <tr>
              <th>
                <Paragraph>All Teams ({teams.length})</Paragraph>
              </th>
              <th>Points</th>
              <th>Rank</th>
            </tr>

            {teams.length > 0 &&
              teams
                .sort((a, b) => a.points - b.points)
                .map((f, index) => (
                  <tr
                    className={f._doc.userId === user._id ? "selected" : ""}
                    onClick={() => navigate(`/savedteam/${f._doc._id}`)}
                  >
                    <td>{f.user.username}</td>
                    <td>{f._doc.points}</td>
                    <td>{index + 1}</td>
                  </tr>
                ))}
          </table>
        </Tabel>
      </TabPanel>
    </Container>
  );
}
