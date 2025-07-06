
import React from 'react';

const ScriptReviewDetails: React.FC = () => {
  return (
    <div className="bg-portfolio-black p-4 rounded border border-portfolio-gold/20">
      <h3 className="text-portfolio-gold font-semibold mb-2">Review Details:</h3>
      <ul className="text-white/80 text-sm space-y-1">
        <li>• Professional script review by industry experts</li>
        <li>• Detailed feedback on story, structure, and characters</li>
        <li>• Recommendations for improvement</li>
        <li>• Turnaround time: 7-14 business days</li>
        <li>• Cost: $50 (payment required before review)</li>
      </ul>
    </div>
  );
};

export default ScriptReviewDetails;
