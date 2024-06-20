import React, { useEffect, useState } from "react";
import { TopicScoreApi } from "../../middleware/LearnerMiddleware/TopicScoreApi";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LearnerNavbar from "..//LearnerComponent/LearnerNavbar";

function TopicScore() {
  const [LearnerId]= useState(sessionStorage.getItem('UserSessionID'));
  const [TopicId]= useState(sessionStorage.getItem('topicId'));
  const [ViewScoresList, setViewScoresList] = useState([]);

  useEffect(() => {
    scoreFetch(LearnerId, TopicId);
  }, []);

  const scoreFetch = async (LearnerId, TopicId) => {
    try {
      const ScoreDataArray = await TopicScoreApi(LearnerId, TopicId);
      console.log(
        "ScoreDataArray",
        ScoreDataArray[0].score,
        ScoreDataArray[0].passMark
      );
      setViewScoresList(ScoreDataArray);
    } catch (error) {
      console.error("error in fetch", error);
    }
  };

  return (
    <div className="scorepage_Learner">
      <LearnerNavbar />
      <div className="mt-5 ">
        <div className="container ">
          <TableContainer component={Paper} >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}} />
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}}>Course Name</TableCell>
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}}>Topic Name</TableCell>
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}}>Score</TableCell>
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}}>Scores Status</TableCell>
                  <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1.5rem"}}>Completion Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ViewScoresList.map((scoreItem, index) => (
                  <Row
                    key={index}
                    row={scoreItem}
                    score={scoreItem.score}
                    passmark={scoreItem.passMark}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

function Row(props) {
  const { row, score, passmark } = props;
  const [open, setOpen] = useState(false);
  const [Passorfail, setPassorFail] = useState("Fail");
  const [reattemptClicked,setReattemptClicked]=useState(false);

  console.log("Row s p", score, passmark);

  useEffect(() => {
    PassorFail(score, passmark);
  }, [score, passmark]);

  const PassorFail = async (score, passmark) => {
    if (score >= passmark) {
      setPassorFail("Pass");
    }
  };

  const handleReattempt = () => {
    // Implement reattempt logic here
    console.log("Reattempt");
    setReattemptClicked(true);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1rem"}}>
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1rem"}}>{row.courseName}</TableCell>
        <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1rem"}}>{row.topicName}</TableCell>
        <TableCell sx={{color: "#27235C",fontWeight:"bold",fontSize:"1rem"}}>{row.score}</TableCell>

        <TableCell>
          <span style={{ color: Passorfail === "Fail" ? "red" : "green" }}>
            {Passorfail}
          </span>
        </TableCell>
        <TableCell>
          {Passorfail === "Fail" && !reattemptClicked ? (
            <button style={{ marginLeft: "2%", backgroundColor: "midnightblue", color: "#fff", width: 100 }} onClick={handleReattempt} >Re-attempt</button>
          ) : (
            <span style={{ color: "green" }}>Completed</span>
          )}
        </TableCell>
        <TableCell>{row.CompletionStatus}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
         
        </TableCell>
      </TableRow>
    </>
  );
}

export default TopicScore;