import React from "react";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderUp, Plus, Trash2, X, RotateCcw } from "lucide-react";

import { defaultFiles, saveFiles } from "@/lib/esp";

const FileList = (props) => {
  const addFile = () => {
    props.setUploads([
      ...props.uploads,
      {
        offset: 0,
      },
    ]);
  };

  const reset = () => {
    const newUploads = defaultFiles(props.chipName);

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const uploadFile = (e, i) => {
    const newUploads = [...props.uploads];

    newUploads[i] = {
      ...newUploads[i],
      fileName: e.target.files[0].name,
      obj: e.target.files[0],
    };

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const setOffset = (index, newOffset) => {
    const newUploads = [...props.uploads];
    newUploads[index] = {
      ...props.uploads[index],
      offset: newOffset,
    };

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const deleteFile = (index) => {
    const file = props.uploads[index];
    const newUploads = [...props.uploads];

    if (file.fileName) {
      newUploads[index] = {
        ...newUploads[index],
        fileName: undefined,
        obj: undefined,
      };
    } else {
      newUploads.splice(index, 1);
    }

    saveFiles(newUploads);
    props.setUploads(newUploads);
  };

  const onlyHex = (e) => {
    const re = /[0-9a-fA-F]+/g;
    if (!re.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-4">
      {/* File Items */}
      <div className="space-y-3">
        {props.uploads.map((file, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 border rounded-lg bg-card"
          >
            {/* Offset */}
            <div className="flex-shrink-0 w-20">
              <Label htmlFor={`offset-${i}`} className="sr-only">
                Offset
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                  0x
                </span>
                <Input
                  id={`offset-${i}`}
                  className="pl-8 text-sm"
                  value={file.offset}
                  onKeyDown={onlyHex}
                  onChange={(e) => setOffset(i, e.target.value)}
                  placeholder="0000"
                />
              </div>
            </div>

            {/* File Name or Select Button */}
            <div className="flex-1 min-w-0">
              {file.fileName ? (
                <div className="text-sm font-medium text-left truncate px-3 py-2 bg-muted rounded border">
                  {file.fileName}
                </div>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <label className="cursor-pointer flex items-center justify-center gap-2">
                    <FolderUp className="w-4 h-4" />
                    Select File
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => uploadFile(e, i)}
                      accept=".bin"
                    />
                  </label>
                </Button>
              )}
            </div>

            {/* Delete Button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteFile(i)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {file.fileName ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span className="sr-only">
                  {file.fileName ? "Remove file" : "Delete slot"}
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="destructive"
          size="lg"
          onClick={reset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={addFile}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

FileList.propTypes = {
  uploads: PropTypes.array,
  setUploads: PropTypes.func,
  chipName: PropTypes.string,
};

export default FileList;
