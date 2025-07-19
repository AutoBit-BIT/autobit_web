import React from "react";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings } from "lucide-react";

import { Chrome } from "lucide-react";
// import Opera
// import OperaIcon from "../_icons/Opera";

const Home = (props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {props.supported() ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="default"
              size="lg"
              onClick={props.connect}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Connect
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={props.openSettings}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <Alert className="max-w-md">
            <AlertDescription className="text-left">
              1. Click on Connect
              <br />
              2. Plug in your ESP & select the port
              <br />
              3. Add your .bin & set the address
              <br />
              4. Click Program to flash it 😊
              <br />
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            <div className="font-medium mb-2">
              Your browser doesn't support Web Serial 😭
            </div>
            <div className="space-y-1">
              <div>
                Try using&nbsp;
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 underline"
                >
                  <Chrome className="inline w-4 h-4 mr-1" />
                  <span className="font-bold">Chrome</span>
                </a>
                ,&nbsp;
                <a
                  href="https://www.microsoft.com/en-us/edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 underline"
                >
                  {/* <EdgeIcon className="inline w-4 h-4 mr-1" /> */}
                  <span className="font-bold">Edge</span>
                </a>
                , or&nbsp;
                <a
                  href="https://www.opera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 underline"
                >
                  {/* <OperaIcon className="inline w-4 h-4 mr-1" /> */}
                  <span className="font-bold">Opera</span>
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                (iOS & Android browsers are not supported)
              </div>
              <div className="mt-2">
                Learn more about&nbsp;
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Serial#browser_compatibility"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  browser compatibility
                </a>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

Home.propTypes = {
  connect: PropTypes.func,
  supported: PropTypes.func,
  openSettings: PropTypes.func,
};

export default Home;
