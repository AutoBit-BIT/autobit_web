import React from "react";
import PropTypes from "prop-types";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { baudrates, saveSettings } from "@/lib/settings";

const Settings = (props) => {
  const [baudRate, setBaudRate] = React.useState(props.settings.baudRate);

  const cancel = () => {
    setBaudRate(props.settings.baudRate);
    props.close();
  };

  const reset = () => {
    if (!props.connected) setBaudRate(115200);
  };

  const save = () => {
    saveSettings({ baudRate: baudRate });
    props.setSettings({ baudRate: baudRate });
    props.close();
    toast.success("Settings saved ✨");
  };

  return (
    <Dialog open={props.open} onOpenChange={props.close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Serial Connection</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="baudrate-select">
              Baud Rate {props.connected && "(Requires Reconnect)"}
            </Label>
            <Select
              value={baudRate.toString()}
              onValueChange={(value) => setBaudRate(parseInt(value))}
              disabled={props.connected}
            >
              <SelectTrigger
                id="baudrate-select"
                className={
                  props.connected ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                <SelectValue placeholder="Select baud rate" />
              </SelectTrigger>
              <SelectContent>
                {baudrates.map((baud) => (
                  <SelectItem value={baud.toString()} key={baud}>
                    {baud} baud
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            onClick={reset}
            variant="destructive"
            disabled={props.connected}
            className={props.connected ? "opacity-50 cursor-not-allowed" : ""}
          >
            Reset
          </Button>
          <div className="flex space-x-2">
            <Button onClick={cancel} variant="secondary">
              Cancel
            </Button>
            <Button onClick={save} variant="default">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

Settings.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  settings: PropTypes.object,
  setSettings: PropTypes.func,
  connected: PropTypes.bool,
};

export default Settings;
