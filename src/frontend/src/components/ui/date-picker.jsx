import React, { useState, useEffect, useRef } from 'react';
import { ErrorMessage } from 'formik';
import './date-picker.css';

const DatePicker = ({
  label,
  name,
  required = false,
  className = '',
  errors,
  touched,
  helpText,
  maxDate = new Date('2003-12-31'),
  minDate = new Date('1920-01-01'),
  setFieldValue
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const calendarRef = useRef(null);
  const yearPickerRef = useRef(null);
  const hasError = errors[name] && touched[name];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
        setShowMonthPicker(false);
        setShowYearPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll to current year when year picker opens
  useEffect(() => {
    if (showYearPicker && yearPickerRef.current) {
      const yearElement = yearPickerRef.current.querySelector(`.year-item[data-year="${currentYear}"]`);
      if (yearElement) {
        yearPickerRef.current.scrollTop = yearElement.offsetTop - yearPickerRef.current.offsetHeight / 2 + yearElement.offsetHeight / 2;
      }
    }
  }, [showYearPicker, currentYear]);

  // Update input value when form value changes
  useEffect(() => {
    const formValue = document.getElementById(name)?.value;
    if (formValue) {
      const date = new Date(formValue);
      if (!isNaN(date.getTime())) {
        setInputValue(formatDisplayDate(formValue));
      }
    }
  }, [name]);

  // Generate days for the current month
  const generateDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth.getMonth(), 1);
    const lastDay = new Date(currentYear, currentMonth.getMonth() + 1, 0);
    
    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentYear, currentMonth.getMonth(), day);
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

  // Generate months for the month picker
  const generateMonths = () => {
    const months = [];
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    for (let i = 0; i < 12; i++) {
      const isCurrentMonth = i === currentMonth.getMonth();
      months.push(
        <div 
          key={i} 
          className={`month-item ${isCurrentMonth ? 'current' : ''}`}
          onClick={() => handleMonthSelect(i)}
        >
          {monthNames[i]}
        </div>
      );
    }
    
    return months;
  };

  // Generate years for the year picker
  const generateYears = () => {
    const years = [];
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    
    for (let year = minYear; year <= maxYear; year++) {
      const isCurrentYear = year === currentYear;
      
      years.push(
        <div 
          key={year} 
          data-year={year}
          className={`year-item ${isCurrentYear ? 'current' : ''}`}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </div>
      );
    }
    
    return years;
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
    
    // Check if we need to adjust the year
    if (newMonth.getFullYear() < minDate.getFullYear()) {
      newMonth.setFullYear(minDate.getFullYear());
      newMonth.setMonth(0); // January
    } else if (newMonth.getFullYear() > maxDate.getFullYear()) {
      newMonth.setFullYear(maxDate.getFullYear());
      newMonth.setMonth(11); // December
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newMonth.getFullYear());
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex) => {
    const newMonth = new Date(currentYear, monthIndex, 1);
    setCurrentMonth(newMonth);
    setShowMonthPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setCurrentYear(year);
    const newMonth = new Date(year, currentMonth.getMonth(), 1);
    setCurrentMonth(newMonth);
    setShowYearPicker(false);
  };

  // Handle date selection
  const handleDateSelect = (dateString) => {
    setFieldValue(name, dateString);
    setInputValue(formatDisplayDate(dateString));
    setShowCalendar(false);
  };

  // Format date for display (DD-MM-YYYY)
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Handle manual input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Try to parse the date
    if (value.length === 10) { // DD-MM-YYYY format has 10 characters
      const parts = value.split('-');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
        const year = parseInt(parts[2], 10);
        
        const date = new Date(year, month, day);
        
        // Check if date is valid and within min-max range
        if (!isNaN(date.getTime()) && date >= minDate && date <= maxDate) {
          setFieldValue(name, formatDate(date));
          setCurrentMonth(date);
          setCurrentYear(date.getFullYear());
        }
      }
    }
  };

  // Toggle month picker
  const toggleMonthPicker = () => {
    setShowMonthPicker(!showMonthPicker);
    setShowYearPicker(false);
  };

  // Toggle year picker
  const toggleYearPicker = () => {
    setShowYearPicker(!showYearPicker);
    setShowMonthPicker(false);
  };

  return (
    <div className={`form-field date-picker-field ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="date-picker-container" ref={calendarRef}>
        <div className="date-input-container">
          <input 
            type="text"
            id={name}
            name={name}
            className={`form-input date-input ${hasError ? 'form-input-error' : ''}`}
            placeholder="DD-MM-YYYY"
            onClick={() => setShowCalendar(true)}
            value={inputValue}
            onChange={handleInputChange}
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
              <div className="current-month-year">
                <button type="button" className="month-year-selector" onClick={toggleMonthPicker}>
                  {currentMonth.toLocaleString('default', { month: 'long' })}
                </button>
                <button type="button" className="month-year-selector" onClick={toggleYearPicker}>
                  {currentYear}
                </button>
              </div>
              <button type="button" onClick={() => navigateMonth(1)}>&gt;</button>
            </div>
            
            {showMonthPicker && (
              <div className="month-picker">
                {generateMonths()}
              </div>
            )}
            
            {showYearPicker && (
              <div className="year-picker" ref={yearPickerRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {generateYears()}
              </div>
            )}
            
            {!showMonthPicker && !showYearPicker && (
              <>
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
              </>
            )}
            
            <div className="calendar-footer">
              <div className="date-range-info">
                <small>Min: {formatDisplayDate(formatDate(minDate))}</small>
                <small>Max: {formatDisplayDate(formatDate(maxDate))}</small>
              </div>
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
