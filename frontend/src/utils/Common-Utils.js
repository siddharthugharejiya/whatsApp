// 
export const Formate_date = (data) => {
     const date = new Date(data); // Create a Date object from the timestamp
     const hours = date.getHours(); // Get the hours
     const minutes = date.getMinutes(); // Get the minutes
   
     // Format the time, ensuring it's always two digits for hours and minutes
     return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
   };
   
