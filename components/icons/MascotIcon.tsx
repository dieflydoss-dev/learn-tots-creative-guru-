
import React from 'react';

const MascotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
      <path d="M12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm0-10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"></path>
      <circle cx="8.5" cy="10.5" r="1.5"></circle>
      <circle cx="15.5" cy="10.5" r="1.5"></circle>
      <path d="M12 14c-1.995 0-2.668 1.488-2.739 1.695-.123.356.091.751.447.874.356.123.751-.091.874-.447C10.613 16.051 11.028 16 12 16s1.387.051 1.418.122c.123.356.518.57.874.447.356-.123.57-.518.447-.874C14.668 15.488 13.995 14 12 14z"></path>
    </svg>
  );
};

export default MascotIcon;
