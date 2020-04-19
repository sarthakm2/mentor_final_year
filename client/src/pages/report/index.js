import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PercentageProgress from "../../components/Progress";
import ReportTable from "../../components/Table";
import UserDetails from "../../components/Questions/UserDetails";
import AnalysisCard from "./AnalysisCard";
import ReportActions from "./ReportActions";
import { rerunTest } from "../../actions/questionAction";
import jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import { USER_LOADED } from "../../store/types";
import ReactPlayer from "react-player";

const Report = props => {
  const { questionReducer, rerunTest } = props;
  const { results } = questionReducer;

 

  if (Object.keys(results).length === 0) return <Redirect to="/mock1" />

  const percentage = (results.scoredWeightage * 100) / results.totalWeightage;
  const totalmarks = results.scoredWeightage;
  const maximummarks = results.totalWeightage;
  const correctNu = results.correctNum;
  const incorrectNu = results.incorrectNum;
  const totalattended = (results.attendedQuestions).length;
  const accuracy = (results.correctNum / (results.attendedQuestions).length) * 100;
  const goodaccuracy = "your accuracy is decent. focus on learning new chapters to improve your overall score";
  const badaccuracy = "you need to improve your accuracy. Focus more on what you already know and lower your attempts to avoid losing marks in negatives";
  let tip = "tip";
  let rank = "";

  if (results.scoredWeightage < 93) {
    rank = "more than 182201";
  } else if (results.scoredWeightage < 129) {
    rank = "75000 to 98000";
  } else if (results.scoredWeightage < 151) {
    rank = "35000 to 50000";
  } else if (results.scoredWeightage < 181) {
    rank = "8500 to 9000";
  } else if (results.scoredWeightage < 200) {
    rank = "5500 to 6000";
  } else if (results.scoredWeightage < 231) {
    rank = "2500 to 3000";
  } else if (results.scoredWeightage < 269) {
    rank = "500 to 1000";
  } else {
    rank = "1 to 100";
  }
  if (accuracy > 70) {
    tip = goodaccuracy;
  }
  else {
    tip = badaccuracy;
  }


// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
 let print=() => {
  const filename  = "Reports";

  html2canvas(document.querySelector("#capture")).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
    pdf.save(filename);
  });
}
  return (
    <div id ="capture" className="container" >
      <div className="row">
        <div className="col-md-8">
          <div className="card report d-flex align-items-center justify-content-center flex-column">
            
            <h2 className="drawer">Report</h2>
            <div className="percentage">
              <table >
                <tr><h4>Total Marks Scored</h4>
                  <td>{totalmarks}</td>
                </tr>

                <tr><h4>Maximum Marks</h4>
                  <td> {maximummarks}</td>
                </tr>

                <tr>
                  <h4>Answered correctly</h4>
                  <td>  {correctNu}</td>
                </tr>

                <tr>
                  <h4>Answered incorrectly</h4>
                  <td>   {incorrectNu}</td>
                </tr>

                <tr>
                  <h4>total attemps</h4>
                  <td>   {totalattended}</td>
                </tr>

                <tr>
                  <h4>Rank prediction</h4>
                  <td>   {rank}</td>
                </tr>
              </table>
            </div>

            <div className="percentage">
              <p>Your overall accuracy of this test.</p>
              <PercentageProgress percentage={accuracy} />
              <h3>{Math.floor(accuracy)} %</h3>


            </div>
            <h4>Suggestion: </h4>{tip}
            <hr></hr>
            <br></br>
            <br></br>
            <br></br>
            <div className="percentage">
              <p>Your overall percentage of this test.</p>
              <PercentageProgress percentage={percentage} />
              <h3>{Math.floor(percentage)} %</h3>
            </div>
            <div className="tables">
              <h3>Attended Questions</h3>
              <ReportTable questionsArr={results.attendedQuestions} />
            </div>

            {/* <ReportActions rerun={() => rerunTest()} /> */}
            <div>
      <h2> Electrostatics</h2>
      <h5>Video will start from 5m 14s</h5>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=kDTBbAzzw1Y?start=5m14s"
    />
  </div>
          </div>
        </div>
        <div className="col-md-4">
          <AnalysisCard incorrectTags={results.incorrectTags} />
          <UserDetails />
        </div>
      </div>
    </div>

   
   
  );



 
}

const mapStateToProps = state => ({ questionReducer: state.questionReducer })

export default connect(mapStateToProps, { rerunTest })(Report);