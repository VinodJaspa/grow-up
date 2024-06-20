export const generate30DayPlan = () => {
  const template = [
    { time: "07:00 AM", activity: "Meditation (20 min)", diet: "", completed: false },
    { time: "07:20 AM", activity: "Warm-up Exercise (30 min)", diet: "", completed: false },
    { time: "07:50 AM", activity: "Get ready for office", diet: "", completed: false },
    { time: "08:30 AM", activity: "Breakfast", diet: "Sprouted moong dal & chana, 100 gm dry fruits", completed: false },
    { time: "09:00 AM", activity: "Work", diet: "", completed: false },
    { time: "12:00 PM", activity: "Mid-morning Snack", diet: "", completed: false },
    { time: "01:00 PM", activity: "Lunch", diet: "", completed: false },
    { time: "03:00 PM", activity: "Afternoon Snack", diet: "", completed: false },
    { time: "05:00 PM", activity: "Tea/Coffee Break", diet: "", completed: false },
    { time: "06:00 PM", activity: "Evening Work", diet: "", completed: false },
    { time: "07:30 PM", activity: "Meditation (20 min)", diet: "", completed: false },
    { time: "07:50 PM", activity: "Warm-up Exercise (30 min)", diet: "", completed: false },
    { time: "08:20 PM", activity: "Evening Snack", diet: "2 bananas, 5 eggs", completed: false },
    { time: "09:00 PM", activity: "Dinner", diet: "", completed: false },
    { time: "10:00 PM", activity: "Relax/Free Time", diet: "", completed: false },
    { time: "11:00 PM", activity: "Prepare for Bed", diet: "", completed: false },
    { time: "11:30 PM", activity: "Sleep", diet: "", completed: false }
  ];

  const currentDate = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return {
      date: formattedDate,
      tasks: template.map(task => ({ ...task })) // Deep copy to avoid reference issues
    };
  });
};
