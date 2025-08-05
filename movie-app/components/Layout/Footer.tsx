// footer containing the copyright information
// footer should always be at the bottom of the page
import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center .sticky bottom-0">
      <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
    </footer>
  );
}