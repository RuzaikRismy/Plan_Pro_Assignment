import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';
import { Typography , Grid, Card, CardContent } from '@material-ui/core';
import { setImageDataFeildValue , setImageEditedStatus } from '../../../../actions/formBuilderServiceAction'
import { useDispatch } from "react-redux";

function ImageEditor(props) {

  const { 
    imageData, 
    metaData 
  } = props;

  const dispatch = useDispatch();
  const [curruntImgSrc, setcurruntImgSrc] = useState(imageData?.src);
  const [isImgEditorShown, setIsImgEditorShown] = useState(true);
  const [editedImgSrc, setEditedImgSrc] = useState();

  useEffect(() => {
    if(metaData?.readOnlyData){
        const key = imageData?.name + '*' + imageData?.id
        const  jsObject = metaData?.readOnlyData;
        if(jsObject?.hasOwnProperty && jsObject?.hasOwnProperty(key) ) {
            let value = jsObject[key];
            setEditedImgSrc(value)
            setIsImgEditorShown(false)
        }
    }
}, []);

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
      <div>
          {/* <button onClick={openImgEditor}>Open Filerobot image editor</button> */}
          <Card>
              <CardContent >
                  <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} >
                          {( isImgEditorShown &&
                            <FilerobotImageEditor height= {800}
                                  source= {curruntImgSrc}                             
                                                                    
                                  onSave={(editedImageObject, designState) =>{
                                    dispatch(setImageDataFeildValue( imageData.id , editedImageObject.imageBase64))
                                    dispatch(setImageEditedStatus( imageData?.id , false))
                                      console.log('saved', editedImageObject, designState)
                                  }
                                  }
                                  onBeforeSave = {(imageFileInfo)=>(console.log('onBeforeSave', imageFileInfo))}
                                  annotationsCommon={{
                                      fill: '#ff0000',
                                  }}
                                  onModify ={(currentImageDesignState)=>{
                                    dispatch(setImageEditedStatus( imageData?.id , true))
                                    console.log('onModify', currentImageDesignState)}}
                                  moreSaveOptions = {                              
                                    [
                                        {
                                          label: 'Save With Configartion',
                                          onClick: (triggerSaveModal, triggerSave) =>
                                            triggerSaveModal((...args) => {
                                                dispatch(setImageDataFeildValue( imageData?.id , args[0].imageBase64));
                                              console.log('saved', args);
                                            }), // Required to pass the callback function
                                          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>', // HTML Element as string
                                        },
                                        {
                                          label: 'Save same sa source',
                                          onClick: (triggerSaveModal, triggerSave) =>
                                            triggerSave((...args) => {
                                              console.log('saved', args);
                                              dispatch(setImageDataFeildValue( imageData?.id , args[0].imageBase64));
                                            }), // Required to pass the callback function
                                          icon: () => (
                                            <svg
                                              width="14"
                                              height="14"
                                              viewBox="0 0 14 14"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              ...
                                            </svg>
                                          ), // React Function component
                                        },
                                      ]
                                  }
                                  Text={{ text: 'Enter your text' }}
                                  Rotate={{ angle: 90, componentType: 'slider' }}
                                  Crop={{
                                      presetsItems: [
                                          {
                                              titleKey: 'classicTv',
                                              descriptionKey: '4:3',
                                              ratio: 4 / 3,
                                              // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                                          },
                                          {
                                              titleKey: 'cinemascope',
                                              descriptionKey: '21:9',
                                              ratio: 21 / 9,
                                              // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                                          },
                                      ],
                                      presetsFolders: [
                                          {
                                              titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                                              // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                                              groups: [
                                                  {
                                                      titleKey: 'facebook',
                                                      items: [
                                                          {
                                                              titleKey: 'profile',
                                                              width: 180,
                                                              height: 180,
                                                              descriptionKey: 'fbProfileSize',
                                                          },
                                                          {
                                                              titleKey: 'coverPhoto',
                                                              width: 820,
                                                              height: 312,
                                                              descriptionKey: 'fbCoverPhotoSize',
                                                          },
                                                      ],
                                                  },
                                              ],
                                          },
                                      ],
                                  }}
                                  tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
                                  defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                                  defaultToolId={TOOLS.TEXT} // or 'Text'
                              />
                          )}
                          {
                            !isImgEditorShown ? <img src = {editedImgSrc}/>:null
                          }
                      </Grid>    
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} >
                  </Grid>
              </CardContent >
          </Card>
      </div>
  );
}

export default ImageEditor;