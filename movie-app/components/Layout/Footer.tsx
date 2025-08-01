// footer containing the copyright information
import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
    </footer>
  );
}