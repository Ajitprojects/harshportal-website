import { useEffect, useState } from "react";


const TypewriterText = () => {
  const [index, setIndex] = useState(0); // word index
  const [subIndex, setSubIndex] = useState(0); // character index
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000); // pause before delete
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) =>
        deleting ? prev - 1 : prev + 1
      );
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);
const services = ["OTT", "IPTV", "KEYS"];
const words = ["Digital Store", "Product's", ...services];
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setBlink((v) => !v);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <p className="text-[10px] sm:text-sm text-purple-400 uppercase font-mono tracking-widest">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-[1px] ml-[1px]">
        {blink ? "|" : " "}
      </span>
    </p>
  );
};

export default TypewriterText;
