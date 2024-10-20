import React, { useState, useEffect } from 'react';

interface TimeInputProps {
  type : "time"
}

const TimeInput: React.FC<TimeInputProps> = ({type,  ...props }) => {
  

  return (
    <input
      type="time"
      style={{width: "200px"}}
      {...props}
    />
  );
};

export default TimeInput;
