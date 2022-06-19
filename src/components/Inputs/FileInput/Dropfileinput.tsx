import { useRef } from "react";
import { Grid, IconButton } from "@mui/material";
import { useStyles } from "./styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  name: string;
  file: any;
  handleFileDrop: (e: any, name: string) => void;
  handleFileRemove: (name: string) => void;
  error?: string;
}

const Dropfileinput = ({
  name,
  file,
  handleFileDrop,
  handleFileRemove,
  error,
}: Props) => {
  const wrapperRef = useRef(null);
  const classes = useStyles();

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const calcFileSize = (file: any): string => {
    const ext = new Array("Bytes", "KB", "MB", "GB");
    let fSize = file.size;

    let i = 0;
    while (fSize > 900) {
      fSize /= 1000;
      i++;
    }

    return Math.round(fSize * 100) / 100 + " " + ext[i];
  };

  return (
    <>
      {/* file input area */}
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
          onChange={(e) => handleFileDrop(e, name)}
        />
        <CloudUploadIcon sx={{ color: "#3346bd", fontSize: 75 }} />
        <p className={classes.smallText}>pdf - smaller than 2 MB</p>
        <p className={classes.bottomText}>
          Drop your
          <span style={{ fontWeight: 500 }}> {name} </span>
          here or
          <span style={{ color: "#4A57A9", fontWeight: 500 }}> browse</span>
        </p>
      </div>

      {/* show preview */}
      {file && (
        <Grid container className={classes.previewContainer}>
          <Grid item xs={1}>
            <InsertDriveFileOutlinedIcon style={{ color: "#333" }} />
          </Grid>
          <Grid item xs={10} pl={1} pr={1}>
            <p className={classes.fileName}>{file.name}</p>
            <p className={classes.fileSize}>{calcFileSize(file)}</p>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small" onClick={() => handleFileRemove(name)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {/* error */}
      {error && <p className={classes.error}>{error}</p>}
    </>
  );
};

export default Dropfileinput;
