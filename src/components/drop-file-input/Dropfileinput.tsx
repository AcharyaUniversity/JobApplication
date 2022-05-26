import React, { useRef , useState} from "react"
import  PropTypes  from "prop-types"
import { ImageConfig } from '../../config/ImageConfig'; 
import '../drop-file-input/drop-file-input.css'

 import  image from '../imges/images.png'

const Dropfileinput=(props)=>{

    const wrapperRef=useRef(null)

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const[FileList,setFileList]=useState([])
console.log(FileList)
    const onFiledrop=(e)=>{
        const newFile=e.target.files[0]
        if(newFile){
            const updatedlist=[...FileList,newFile]
            setFileList(updatedlist)
            props.onFileChange(updatedlist)
        }

    }
    const fileRemove = (file) => {
        const updatedlist = [...FileList];
        updatedlist.splice(FileList.indexOf(file), 1);
        setFileList(updatedlist);
        props.onFileChange(updatedlist);
    }


    return (
        
        <div className="drop-file-inpt"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
       
        >
            <div className="drop-file-input_label">
                <img src={image} alt=" "/>
                <p>Drag and drop your files</p>
                <input type="file" value="" onChange={onFiledrop} />
                
            </div>
            {
                FileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            FileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
    </div>
        

    )
}

Dropfileinput.propTypes={
onFileChange:PropTypes.func
}
export default Dropfileinput