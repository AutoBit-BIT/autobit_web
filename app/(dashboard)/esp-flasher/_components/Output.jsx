import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronDown, ExternalLink } from "lucide-react";

import { setCookie, getCookie } from "@/lib/cookie";

const Output = (props) => {
  // Currently received string & list of previous received lines
  const received = useRef("");
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const str = `${received.current}${props.received.value}`;
    const lines = str.split("\n");

    let newReceived = str;
    const newLines = [];

    if (lines.length > 1) {
      newReceived = lines.pop();

      lines.forEach((line) => {
        newLines.push(`${line}`);
      });
    }
    setLines((current) => current.concat(newLines));
    received.current = newReceived;
  }, [props.received]);

  // Output toggle Visibility
  const loadOpen = () => {
    const cookieValue = getCookie("output");
    return cookieValue ? cookieValue === "true" : true;
  };

  const openOutput = (value) => {
    setVisible(value);
    setCookie("output", value);
  };

  const [visible, setVisible] = React.useState(loadOpen());

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center justify-between mb-2">
        {/* Toggle */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="output-toggle"
            checked={visible}
            onCheckedChange={openOutput}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="output-toggle"
            className="flex items-center cursor-pointer text-sm font-medium"
          >
            {visible ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            )}
            Output
          </Label>
        </div>

        {/* Terminal Button */}
        {/* {visible && (
          <Button variant="outline" size="sm" asChild className="ml-auto">
            <a
              href="https://serial.huhn.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Terminal
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </Button>
        )} */}
      </div>

      {/* Actual Output */}
      {visible && (
        <div className="bg-muted/50 border rounded-md p-3 max-h-64 overflow-y-auto">
          <code className="text-xs leading-relaxed whitespace-pre-wrap">
            {/* Lines */}
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </code>
        </div>
      )}
    </div>
  );
};

Output.propTypes = {
  received: PropTypes.object,
};

export default Output;
