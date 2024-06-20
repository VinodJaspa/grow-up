// src/Components/ChallengesTabs.js
import React, { useState } from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import NoComplaintChallenge from '../Components/Challanges/NoComplaintChallege';
import MinimalismGame from '../Components/Challanges/MinimlisationGame';
import SeventyFiveHard from '../Components/Challanges/SeventyFiveHard';
import DigitalDetox from '../Components/Challanges/DigitalDitox';
import MoneySavingChallenge from '../Components/Challanges/MoneySaving52';
import MorningPages from '../Components/Challanges/MoringJournals';


const ChallengesTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="No Complaint Challenge" />
        <Tab label="Minimalism Game" />
        <Tab label="75 Hard Challenge" />
        <Tab label="Digital Detox Challenge" />
        <Tab label="52 Week Money Saving Challenge" />
        <Tab label="Morning Pages Challenge" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <NoComplaintChallenge />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <MinimalismGame />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <SeventyFiveHard />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <DigitalDetox />
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <MoneySavingChallenge />
      </TabPanel>
      <TabPanel value={tabIndex} index={5}>
        <MorningPages />
      </TabPanel>
    </Paper>
  );
};

export default ChallengesTabs;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`challenges-tabpanel-${index}`}
      aria-labelledby={`challenges-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}
