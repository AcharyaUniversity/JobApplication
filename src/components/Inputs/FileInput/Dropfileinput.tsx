import { useEffect, useRef, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { useStyles } from "./styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  index: number;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const Dropfileinput = ({ index, files, setFiles }: Props) => {
  const wrapperRef = useRef(null);
  const classes = useStyles();

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleFileDrop = (e: any) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFiles((prev) =>
        prev.map((o, i) => {
          if (i === index) return newFile;
          return o;
        })
      );
    }
  };
  const handleFileRemove = () => {
    setFiles((prev) =>
      prev.map((o, i) => {
        if (i === index) return null;
        return o;
      })
    );
  };

  return (
    <>
      <div
        className={classes.dropFileInput}
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          className={classes.input}
          onChange={handleFileDrop}
        />
        <CloudUploadIcon sx={{ color: "#3346bd", fontSize: 75 }} />
        <p className={classes.smallText}>pdf - smaller than 5MB</p>
        <p className={classes.bottomText}>
          Drop your
          {index === 0 && <span style={{ fontWeight: 500 }}> resume </span>}
          {index === 1 && <span style={{ fontWeight: 500 }}> degree </span>}
          here or
          <span style={{ color: "#4A57A9", fontWeight: 500 }}> browse</span>
        </p>
      </div>
      {files[index] && (
        <Grid container className={classes.previewContainer}>
          <Grid item xs={1}>
            <InsertDriveFileOutlinedIcon style={{ color: "#333" }} />
          </Grid>
          <Grid item xs={10} pl={1} pr={1}>
            <p className={classes.fileName}>{files[index].name}</p>
            <p className={classes.fileSize}>123.54 kb</p>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small" onClick={handleFileRemove}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dropfileinput;
