import React from "react";
import { connect } from "react-redux";
import DashboardRounded from "@material-ui/icons/DashboardRounded";
import HomeButton from "../../components/Button/HomeButton";
import GoogleButton from "../../components/Button/Google";
import home_art from "../../assets/images/home.svg";
import SigninDialog from "../../components/Dialog/Signin";
import SignupDialog from "../../components/Dialog/Signup";
import { handleDialog } from "../../actions/appStateAction";
import ReactPlayer from "react-player";

function Revision(props) {
  const { auth, handleDialog } = props;

  return (
    <div id ="capture" className="container" >
    <div className="row">
      <div className="col-md-8">
        <div className="card report d-flex align-items-center justify-content-center flex-column">
          
          <h1 className="drawer">Revision</h1>
          <br></br>
          <hr></hr>
          <br></br>
    <div>
      <h2> Kinematics basics</h2>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=6wa0cSUWqXQ"
    />
  </div>
  <br></br>
  <hr></hr>
  <div>
      <h2> Current Electricity</h2>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=0nCPA4XcNDw?start=1m33s"
    />
  </div>

  <div>
      <h2> Electrostatics</h2>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=kDTBbAzzw1Y"
    />
  </div>
 
  <div>
      <h2> Mechanics</h2>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=iiKzy05zpx0"
    />
  </div>
  </div>
  </div>
  </div>
  </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authReducer
})

export default connect(mapStateToProps, { handleDialog })(Revision);