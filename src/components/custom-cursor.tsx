"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device supports touch
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    setIsTouchDevice(checkTouchDevice());

    // Hide cursor on touch devices
    if (checkTouchDevice()) {
      return;
    }

    // Add custom cursor class to body
    document.body.classList.add('custom-cursor-active');

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.tagName === 'INPUT' || 
                           target.tagName === 'TEXTAREA' || 
                           target.tagName === 'SELECT' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.closest('input') ||
                           target.closest('textarea') ||
                           target.closest('select') ||
                           target.closest('[role="button"]') ||
                           target.closest('[data-interactive]');
      
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      // Remove custom cursor class from body
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Don't render until mounted on client
  if (!isMounted) {
    return null;
  }

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-[9999] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.1s ease-out',
      }}
    >
      {/* Main cursor dot */}
      <div
        className={`rounded-full ${
          isHovering
            ? 'w-3 h-3 bg-blue-500'
            : 'w-2 h-2 bg-gray-900 dark:bg-gray-100'
        }`}
        style={{
          transition: 'all 0.2s ease-out',
        }}
      />
      
      {/* Water ripple effect - only when hovering */}
      {isHovering && (
        <>
          <div
            className="absolute rounded-full border border-blue-500/40 animate-cursor-ripple"
            style={{
              width: '24px',
              height: '24px',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute rounded-full border border-blue-500/20 animate-cursor-ripple-delayed"
            style={{
              width: '24px',
              height: '24px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}
    </div>
  );
}
