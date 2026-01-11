import React from "react";
// import { Page } from "../App";

type Props = {
  goSignup: () => void;
  goLogin: () => void;
};

const Dashboard: React.FC<Props> = ({ goSignup, goLogin }) => {
  return (
    <div>
      <h1>welcome my project</h1>
      <p>simple demo for sign up and login.</p>

      <button onClick={goSignup}>sign up</button>
      <button style={{ marginLeft: 8 }} onClick={goLogin}>
        login
      </button>
    </div>
  );
};

export default Dashboard;