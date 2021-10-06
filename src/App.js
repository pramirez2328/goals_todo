import React, { useState, useEffect } from "react";

import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import style from "./App.module.css";
// import apiCall from "./apiCall";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { text: "Do all exercises!", id: "g1" },
    { text: "Finish the course!", id: "g2" },
  ]);
  const [quote, setQuote] = useState("");

  async function apiCall() {
    const call = await fetch("https://type.fit/api/quotes");
    const response = await call.json();
    let randNumber = Math.floor(Math.random() * 1643);
    setQuote(response[randNumber]);
  }

  useEffect(() => {
    apiCall();
  }, []);

  const addGoalHandler = (enteredText) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div id={style.card}>
      <h2 className={style.quote}>{quote.text}</h2>
      <h5 className={style.author}>{`- ${quote.author} -`}</h5>
      <section id={style["goal-form"]}>
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id={style.goals}>
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
};

export default App;
