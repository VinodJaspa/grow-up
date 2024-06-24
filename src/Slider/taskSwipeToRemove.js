import React from "react";
// Import the react-swipe-to-delete-component
import SwipeToDelete from "react-swipe-to-delete-component";
import { Card, CardContent, Checkbox, Typography } from '@mui/material';
import "./slider.css"
const ListItems = ({ item, handleDone ,handleDelete ,index}) => (
    <SwipeToDelete key={item.id} tag="card" classNameTag="tw feed" onDelete={() => handleDelete(item.id , index)}>
        <Card className='hourly-card'>
            <CardContent>
                <Typography variant="body1" className="time-text">
                    {item.taskTime}
                </Typography>
                <Typography variant="body1" className="task-name">
                    {item.taskName}
                </Typography>
                <div className="action-buttons">
                    <Checkbox color="primary" onClick={handleDone} />
                </div>
            </CardContent>
        </Card>
    </SwipeToDelete>
);

export default function TaskSwipetoRemoveSlider({ data, handleDone ,handleDelete}) {
   
    return (
        <>
            {data && data.map((item ,i) => (
                <ListItems key={item.id} item={item} index={i}handleDone={handleDone} handleDelete={handleDelete} />
            ))}
        </>
    );
}
