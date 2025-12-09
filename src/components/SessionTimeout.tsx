"use client";
import React, { useEffect } from "react";

export default function SessionTimeout() {
  useEffect(() => {
    const handleActivity = () => {
      window.sessionStorage.setItem('lastActivity', Date.now().toString());
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    const checkTimeout = () => {
      const last = Number(window.sessionStorage.getItem('lastActivity')) || Date.now();
      if (Date.now() - last > 1800000) {
        alert('Session timed out due to inactivity. Please refresh to continue.');
        window.location.reload();
      }
    };
    const interval = setInterval(checkTimeout, 60000);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(interval);
    };
  }, []);
  return null;
}
