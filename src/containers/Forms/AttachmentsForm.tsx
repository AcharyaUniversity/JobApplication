import React from "react";
import Dropfileinput from "../../components/drop-file-input/Dropfileinput";

function AttachmentsForm() {
  
  const onFileChange=((files)=>{
    console.log(files)
  })
  


  return(
    <div className="box">
      <h2 className="header">
          React drop files input
      </h2>
      <Dropfileinput
         onFileChange={(files)=>onFileChange(files)}
      />
    </div>
  )
}

export default AttachmentsForm;
