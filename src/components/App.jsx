import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = (...numbers) => {
    return numbers.reduce((acc, number) => (acc += number), 0);
  };

  const countPositiveFeedbackPercentage = (good, neutral, bad) => {
    const total = good + neutral + bad;
    const positivePercentage = (good / (total - neutral)) * 100;
    return positivePercentage.toFixed(0);
  };

  const totalFeedbackCount = countTotalFeedback(good, neutral, bad);

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        good={() => setGood(state => state + 1)}
        neutral={() => setNeutral(state => state + 1)}
        bad={() => setBad(state => state + 1)}
      />
      {totalFeedbackCount > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
