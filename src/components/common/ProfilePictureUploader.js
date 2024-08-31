import React, { Component, createRef } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import Webcam from "react-webcam";
import './commonStyle.css';

class ProfilePictureUploader extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: null, 
            isWebCamOn: false 
        }
        this.webCamRef = createRef();
    }

    render(){
        return(

            <div className="row">

                <div className="col-lg-6">
                    {
                        this.state.isWebCamOn ?
                        <div className="webCamContainer user-image">
                            <div className="webCamera">
                                <Webcam
                                    ref={ this.webCamRef }
                                    mirrored={ true }
                                    screenshotFormat="image/jpeg"
                                />
                            </div>
                        </div>
                        :
                        <img id="profile-image" className="user-image" src={ this.state.image ? this.state.image : require("../../assets/images/user.png")}/>
                    }
                </div>
                
                { !this.state.isWebCamOn ?
                    <div className="col-lg-3 icon-block">
                        <label type="button" onClick={ this.turnWebCam.bind(this) } className="cam-image">
                            <img src={ require("../../assets/images/icons/camera.png") } alt="cam"/>
                        </label>
                        <Dropzone 
                            onDrop={ this.dropImageHandler.bind(this) }
                            multiple={ false }
                            accept= "image/jpeg, image/png"
                            >
                            {
                                ({ getRootProps, getInputProps, isDragActive, multiple=false }) => (
                                    <div {...getRootProps()}>
                                        <input className="input-box" {...getInputProps()}/>
                                        <label type="button" className="folder-image">
                                            <img src={ require("../../assets/images/icons/folder.png") } alt="cam"/>
                                        </label>
                                    </div>
                                )
                            }
                        </Dropzone>
                        
                    </div>
                    :
                    <div className="col-lg-3 icon-block">
                        <label type="button" onClick={ this.turnWebCam.bind(this) } className="cam-image">
                            <img src={ require("../../assets/images/icons/cancel.png") } alt="cam"/>
                        </label>
                        <label type="button" onClick={ this.webCamImgUpload.bind(this) } className="folder-image">
                            <img src={ require("../../assets/images/icons/capture.png") } alt="cam"/>
                        </label>
                    </div>
                    }
               


                {/* { this.state.isWebCamOn ?
                    <div className="webCamContainer text-center col-md-12">
                        <div className="webCamera">
                            <Webcam
                                ref={ this.webCamRef }
                                mirrored={ true }
                                screenshotFormat="image/jpeg"
                            />
                            <label onClick={ this.turnWebCam.bind(this) } className="close-icon"><i className="fa fa-times-circle" aria-hidden="true"></i></label>
                        </div>
                        <div className="webCam-btn">
                            <label className="image-click-btn" onClick={ this.webCamImgUpload.bind(this) }><i className="fa fa-camera" aria-hidden="true"></i></label>
                        </div>
                    </div>
                    :
                    <div className="text-center">
                        <div className="profile-picture">
                        {
                            this.state.image ?
                            <img id="profile-image" className="user-logo" src={ this.state.image }/>
                            :
                            <img id="default-image" className="default-user-logo" src={ require("../../assets/images/user.png") } alt="mountain"/>
                        }
                    </div>
                        
                    <div className="text-center">
                        <button className="image-file-upload">
                            <Dropzone 
                                onDrop={ this.dropImageHandler.bind(this) }
                                multiple={ false }
                                accept= "image/jpeg, image/png"
                                >
                                {
                                    ({ getRootProps, getInputProps, isDragActive, multiple=false }) => (
                                        <div {...getRootProps()}>
                                            <input className="input-box" {...getInputProps()}/>
                                            <label><i className="fa fa-folder"></i></label>
                                        </div>
                                    )
                                }
                            </Dropzone>
                        </button>
                        <button className="image-camera-upload" onClick={ this.turnWebCam.bind(this) }><i className="fa fa-camera"></i></button>
                    </div>
                        
                    </div>
                }  */}

            </div>

        );
    }

    dropImageHandler(acceptedFiles){
        var reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = function () {
            this.setState({ image: reader.result });
            if(this.props.getImage){
                this.props.getImage(reader.result);
            }
        }.bind(this);

        reader.onerror = function (error) {
            console.log('Error: ', error);
        }.bind(this);
    }

    turnWebCam(){
        this.setState({ isWebCamOn: !this.state.isWebCamOn });
    }

    webCamImgUpload(event){
        var webCamImage = this.webCamRef.current.getScreenshot();
        this.setState({ 
            image: webCamImage, 
            isWebCamOn: false 
        });
        this.props.getImage(webCamImage);
    }

}

export default ProfilePictureUploader;