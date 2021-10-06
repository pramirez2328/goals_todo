import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  const goalInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue === "") {
      setInvalid(true);
    } else {
      setInvalid(false);
      props.onAddGoal(enteredValue);
      setEnteredValue("");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={styles["form-control"]}>
        <label>Course Goal</label>
        <input
          type="text"
          value={enteredValue}
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
      {invalid ? (
        <h5 style={{ color: "red", display: "inline", marginLeft: "1.5rem" }}>
          - enter a goal! -
        </h5>
      ) : (
        ""
      )}
    </form>
  );
};

export default CourseInput;
