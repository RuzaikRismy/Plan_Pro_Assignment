import React, {  useLayoutEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import MUIRichTextEditor from "mui-rte"


import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenter from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRight from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustify from "@material-ui/icons/FormatAlignJustify";

/**
|--------------------------------------------------
| Editor Block Styling
|--------------------------------------------------
*/
const EditorJustifyStartBlock = (props) => {
  return <Grid style={{ display: "block", textAlign: "left" }}>
    {props.children}
  </Grid>
}
const EditorJustifyEndBlock = (props) => {
  return <Grid style={{ display: "block", textAlign: "right" }}>
    {props.children}
  </Grid>
}
const EditorJustifyCenterBlock = (props) => {
  return <Grid style={{ display: "block", textAlign: "center" }} >
    {props.children}
  </Grid>
}
const EditorTextJustifyBlock = (props) => {
  return <Grid style={{ display: "block", textAlign: "justify" }}>
    {props.children}
  </Grid>
}

const EditorField = (props) => {

  const {
    editorId,
    isEditorError,
    defaultValue,
    editorSaveAction,
    onEditorChangeAction,
    classes,
    label,
    isMediaLinked,
    ...otherProps
  } = props;
  //states  
  const [editorFieldState, setEditorFieldState] = useState({
    isError: false,
    defaultEditorValue: null
  })

  /**
  |--------------------------------------------------
  | Layout Effect on default value or editor error (to validated the passing content prior editor render)
  |--------------------------------------------------
  */
  useLayoutEffect(()=>{
    let isDefaultValueValid = false;
    if(defaultValue){
      try{
        let rawData = JSON.parse(defaultValue);
        if(typeof rawData === 'object'){
          isDefaultValueValid = true;
        }else{
          isDefaultValueValid = false
        }
      }catch(e){
        isDefaultValueValid = false
      }
      setEditorFieldState(prev=>({
        ...prev,
        isError: !isDefaultValueValid  || isEditorError,
        defaultEditorValue: (isDefaultValueValid  && !isEditorError) ? defaultValue : prev?.defaultEditorValue
      }))
    }
  },[defaultValue, isEditorError])

  return (
    <MUIRichTextEditor
      id={'assessment_editor_field' || editorId}
      error={editorFieldState.isError}
      label={label}
      defaultValue={editorFieldState?.defaultEditorValue}
      onSave={(data) => {
        editorSaveAction && editorSaveAction(data);
      }}
      onChange={onEditorChangeAction}
      classes={classes}
      controls={[
        "undo",
        "redo",
        "title",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "highlight",
        "numberList",
        "bulletList",
        "clear",
        isMediaLinked && "media",
        //custom controls
        "textAlignStart",
        "textAlignCenter",
        "textAlignRight",
        "textAlignJustify",
      ]}
      customControls={[
        {
          name: "textAlignStart",
          icon: <FormatAlignLeft id="editorNoteAlignLeft" />,
          type: "block",
          blockWrapper: <EditorJustifyStartBlock />
        },
        {
          name: "textAlignCenter",
          icon: <FormatAlignCenter id="editorNoteAlignCenter" />,
          type: "block",
          blockWrapper: <EditorJustifyCenterBlock />
        },
        {
          name: "textAlignRight",
          icon: <FormatAlignRight id="editorNoteAlignRight" />,
          type: "block",
          blockWrapper: <EditorJustifyEndBlock />
        },
        {
          name: "textAlignJustify",
          icon: <FormatAlignJustify id="editorNoteAlignJustify" />,
          type: "block",
          blockWrapper: <EditorTextJustifyBlock />
        },
      ]}
      {...(otherProps || {})}
    />
  )
}



export { EditorJustifyCenterBlock, EditorJustifyEndBlock, EditorJustifyStartBlock, EditorTextJustifyBlock };
export default EditorField;