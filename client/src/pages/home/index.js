import React from "react";
import { connect } from "react-redux";
import DashboardRounded from "@material-ui/icons/DashboardRounded";
import HomeButton from "../../components/Button/HomeButton";
import GoogleButton from "../../components/Button/Google";
import home_art from "../../assets/images/home.svg";
import SigninDialog from "../../components/Dialog/Signin";
import SignupDialog from "../../components/Dialog/Signup";
import { handleDialog } from "../../actions/appStateAction";

function Home(props) {
  const { auth, handleDialog } = props;

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex flex-column align-items-center justify-content-center">
            <img src={home_art} alt="MCQ home" />
            <h1>MENTOR - JEE PREP PLATFORM</h1>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center flex-column">
            <p>A Platform to practice for MCQ Exams, personalised according to Computer Adaptive Test. Generates report and provides you with suggesions for future imrovments</p>
            {
              auth.isAuthenticated ?
                <div>
                   <HomeButton
                    to="/dashboard/4"
                    color="primary"
                    text="Mock Test"
                    icon={<DashboardRounded style={{ marginLeft: "16px" }} />}
                  />
                 
                  <br></br>
                  <hr></hr>
                  <HomeButton
                    to="/dashboard/2"
                    color="primary"
                    text="Chemistry"
                    icon={<DashboardRounded style={{ marginLeft: "16px", marginTop: "10px" }} />}
                  />
                    <br></br>
                  <hr></hr>
                  <HomeButton
                    to="/dashboard/3"
                    color="primary"
                    text="Maths"
                    icon={<DashboardRounded style={{ marginLeft: "16px" }} />}
                  />
                    <br></br>
                  <hr></hr>
                  <HomeButton
                    to="/dashboard/1"
                    color="primary"
                    text="Physics"
                    icon={<DashboardRounded style={{ marginLeft: "16px"}} />}
                  />
                    <br></br>
                  <hr></hr>
                   <HomeButton
                    to="/revision"
                    color="primary"
                    text="Revision"
                    icon={<DashboardRounded style={{ marginLeft: "16px" }} />}
                  />
                </div>

                : <React.Fragment>
                  <HomeButton
                    onClick={() => handleDialog("signinDialogOpen", true)}
                    color="primary"
                    text="Sign in"
                    icon={<DashboardRounded style={{ marginLeft: "16px" }} />}
                  />
                  <HomeButton
                    onClick={() => handleDialog("signupDialogOpen", true)}
                    color="secondary"
                    className="my-3"
                    text="Create an account"
                  />

                  <GoogleButton text="Continue with Google" />
                </React.Fragment>

            }
          </div>
        </div>
      </div>
      <SigninDialog />
      <SignupDialog />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authReducer
})

export default connect(mapStateToProps, { handleDialog })(Home);