"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

// import Header from "./_components/Header";
import Home from "./_components/Home";
import FileList from "./_components/FileList";
import Output from "./_components/Output";
// import Buttons from "./_components/Buttons";
import { Button } from "@/components/ui/button";
import Settings from "./_components/Settings";
import ConfirmWindow from "./_components/ConfirmWindow";
// import Footer from "./_components/Footer";

import {
  connectESP,
  formatMacAddr,
  sleep,
  loadFiles,
  supported,
} from "@/lib/esp";
import { loadSettings, defaultSettings } from "@/lib/settings";

const App = () => {
  const [connected, setConnected] = React.useState(false); // Connection status
  const [connecting, setConnecting] = React.useState(false);
  const [output, setOutput] = React.useState({
    time: new Date(),
    value: "Click Connect to start\n",
  }); // Serial output
  const [espStub, setEspStub] = React.useState(undefined); // ESP flasher stuff
  const [uploads, setUploads] = React.useState([]); // Uploaded Files
  const [settingsOpen, setSettingsOpen] = React.useState(false); // Settings Window
  const [settings, setSettings] = React.useState({ ...defaultSettings }); // Settings
  const [confirmErase, setConfirmErase] = React.useState(false); // Confirm Erase Window
  const [confirmProgram, setConfirmProgram] = React.useState(false); // Confirm Flash Window
  const [flashing, setFlashing] = React.useState(false); // Enable/Disable buttons
  const [chipName, setChipName] = React.useState(""); // ESP8266 or ESP32

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // Add new message to output
  const addOutput = (msg) => {
    setOutput({
      time: new Date(),
      value: `${msg}\n`,
    });
  };

  // Connect to ESP & init flasher stuff
  const clickConnect = async () => {
    if (espStub) {
      await espStub.disconnect();
      await espStub.port.close();
      setEspStub(undefined);
      return;
    }

    const esploader = await connectESP({
      log: (...args) => addOutput(`${args[0]}`),
      debug: (...args) => console.debug(...args),
      error: (...args) => console.error(...args),
      baudRate: parseInt(settings.baudRate),
    });

    try {
      const connectingToast = toast.loading("Connecting...");
      setConnecting(true);

      await esploader.initialize();

      addOutput(`Connected to ${esploader.chipName}`);
      addOutput(`MAC Address: ${formatMacAddr(esploader.macAddr())}`);

      const newEspStub = await esploader.runStub();

      setConnected(true);
      toast.success("Connected 🚀", { id: connectingToast });

      newEspStub.port.addEventListener("disconnect", () => {
        setConnected(false);
        setEspStub(undefined);
        toast.warning("Disconnected 💔");
        addOutput(
          `------------------------------------------------------------`
        );
      });

      setEspStub(newEspStub);
      setUploads(await loadFiles(esploader.chipName));
      setChipName(esploader.chipName);
    } catch (err) {
      const shortErrMsg = `${err}`.replace("Error: ", "");
      toast.error(shortErrMsg);
      addOutput(`${err}`);

      await esploader.port.close();
      await esploader.disconnect();
    } finally {
      setConnecting(false);
    }
  };

  // Erase firmware on ESP
  const erase = async () => {
    setConfirmErase(false);
    setFlashing(true);
    const eraseToast = toast.loading("Erasing flash memory. Please wait...");

    try {
      const stamp = Date.now();

      addOutput(`Start erasing`);
      const interval = setInterval(() => {
        addOutput(`Erasing flash memory. Please wait...`);
      }, 3000);

      await espStub.eraseFlash();

      clearInterval(interval);
      addOutput(`Finished. Took ${Date.now() - stamp}ms to erase.`);
      toast.success("Finished erasing memory.", { id: eraseToast });
    } catch (e) {
      addOutput(`ERROR!\n${e}`);
      toast.error(`ERROR!\n${e}`, { id: eraseToast });
      console.error(e);
    } finally {
      setFlashing(false);
    }
  };

  // Flash Firmware
  const program = async () => {
    setConfirmProgram(false);
    setFlashing(true);

    let success = false;

    const toArrayBuffer = (inputFile) => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsArrayBuffer(inputFile);
      });
    };

    for (const file of uploads) {
      if (!file.fileName || !file.obj) continue;
      success = true;

      const uploadToast = toast.loading(
        `Uploading ${file.fileName.substring(0, 28)}...`
      );

      try {
        const contents = await toArrayBuffer(file.obj);

        await espStub.flashData(
          contents,
          (bytesWritten, totalBytes) => {
            const progress = bytesWritten / totalBytes;
            const percentage = Math.floor(progress * 100);

            // Update toast with progress
            toast.loading(
              `Uploading ${file.fileName.substring(0, 28)}... ${percentage}%`,
              { id: uploadToast }
            );
            addOutput(`Flashing... ${percentage}%`);
          },
          parseInt(file.offset, 16)
        );

        toast.success(`Uploaded ${file.fileName.substring(0, 28)}`, {
          id: uploadToast,
        });
        await sleep(100);
      } catch (e) {
        addOutput(`ERROR!`);
        addOutput(`${e}`);
        toast.error(`Upload failed: ${e}`, { id: uploadToast });
        console.error(e);
      }
    }

    if (success) {
      addOutput(`Done!`);
      addOutput(`To run the new firmware please reset your device.`);
      toast.success("Done! Reset ESP to run new firmware.");
    } else {
      addOutput(`Please add a .bin file`);
      toast.info("Please add a .bin file");
    }

    setFlashing(false);
  };

  return (
    <div className="min-w-96 min-h-screen flex flex-col">
      {/* <Header className="mb-4" /> */}

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
        {/* Home Page */}
        {!connected && !connecting && (
          <div className="flex items-center justify-center">
            <Home
              connect={clickConnect}
              supported={supported}
              openSettings={() => setSettingsOpen(true)}
            />
          </div>
        )}

        {/* Connecting State */}
        {!connected && connecting && (
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-bold text-muted-foreground">
              Connecting...
            </h2>
          </div>
        )}

        {/* FileUpload Page */}
        {connected && (
          <div className="w-full max-w-2xl">
            <FileList
              uploads={uploads}
              setUploads={setUploads}
              chipName={chipName}
            />
          </div>
        )}

        {/* Erase & Program Buttons */}
        {connected && (
          <div className="flex items-center justify-center">
            <Button
              erase={() => setConfirmErase(true)}
              program={() => setConfirmProgram(true)}
              disabled={flashing}
            />
          </div>
        )}

        {/* Serial Output */}
        {supported() && (
          <div className="w-full max-w-2xl">
            <Output received={output} />
          </div>
        )}
      </div>

      {/* Settings Window */}
      <Settings
        open={settingsOpen}
        close={() => setSettingsOpen(false)}
        setSettings={setSettings}
        settings={settings}
        connected={connected}
      />

      {/* Confirm Erase Window */}
      <ConfirmWindow
        open={confirmErase}
        text={"This will erase the memory of your ESP."}
        onOk={erase}
        onCancel={() => setConfirmErase(false)}
      />

      {/* Confirm Flash/Program Window */}
      <ConfirmWindow
        open={confirmProgram}
        text={"Flashing new firmware will override the current firmware."}
        onOk={program}
        onCancel={() => setConfirmProgram(false)}
      />

      {/* Toast Container */}
      {/* <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          duration: 3000,
        }}
      /> */}

      {/* Footer */}
      {/* <Footer className="mt-auto" /> */}
    </div>
  );
};

export default App;
