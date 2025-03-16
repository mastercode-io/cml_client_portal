import React, { useState, useEffect, useRef } from 'react';
import { Field, ErrorMessage } from 'formik';
import './date-picker.css';

const DatePicker = ({
  label,
  name,
  required = false,
  className = '',
  errors,
  touched,
  helpText,
  maxDate = new Date(),
  minDate = new Date('1900-01-01'),
  setFieldValue
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const hasError = errors[name] && touched[name];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate days for the current month
  const generateDays = () => {
    const days = [];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = date > maxDate || date < minDate;
      const formattedDate = formatDate(date);
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleDateSelect(formattedDate)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle month navigation
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Handle date selection
  const handleDateSelect = (dateString) => {
    setFieldValue(name, dateString);
    setShowCalendar(false);
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={`form-field date-picker-field ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="date-picker-container" ref={calendarRef}>
        <div className="date-input-container">
          <Field 
            type="text"
            id={name}
            name={name}
            className={`form-input date-input ${hasError ? 'form-input-error' : ''}`}
            placeholder="DD/MM/YYYY"
            onClick={() => setShowCalendar(true)}
            readOnly
          />
          <button 
            type="button" 
            className="calendar-toggle"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>
        
        {showCalendar && (
          <div className="calendar-dropdown">
            <div className="calendar-header">
              <button type="button" onClick={() => navigateMonth(-1)}>&lt;</button>
              <div className="current-month">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button type="button" onClick={() => navigateMonth(1)}>&gt;</button>
            </div>
            
            <div className="calendar-days-header">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            
            <div className="calendar-days">
              {generateDays()}
            </div>
          </div>
        )}
      </div>
      
      {helpText && <small className="form-help-text">{helpText}</small>}
      <ErrorMessage name={name} component="div" className="form-error" />
    </div>
  );
};

export default DatePicker;
