import { useEffect, useState } from 'react';
import { low, medium, high } from './data';
import { useLocation } from "react-router-dom";
import viewCss from './ViewSource.module.css';

export default function ViewSource() {
  const location = useLocation();
  const [code, setCode] = useState("");
  const { level } = location.state || {}; // Destructure the level passed via navigate

  useEffect(() => {
    if (level === 'low') {
      setCode(low);
    } else if (level === 'medium') {
      setCode(medium);
    } else if (level === 'high') {
      setCode(high);
    } else {
      setCode(""); // Clear any unexpected state
    }
  }, [level]); // Depend on `level` so this effect runs when the level changes

  return (
    <div className={viewCss.viewsource}>
      <pre>{code || "No code available"}</pre>
    </div>
  );
}
