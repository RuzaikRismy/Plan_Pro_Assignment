import React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, FormHelperText, Checkbox} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./CommonStyle.scss";

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: "100%",
	},
}));

const DropDown = (props) => {
	const classes = useStyles();
	return (
		<>
		<Box>
			<FormControl
				sx={{ m: 1, minWidth: 120 }}
				className={props.formControlClass || classes.formControl}
				size={props.size}
				error={props.error}
				required={props.required}
				disabled={props.disabled}
				{...props}
			>
				<InputLabel id="select-outlined-label">{props.label}</InputLabel>
				<Select
					MenuProps={{
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						getContentAnchorEl: null,
					}}
					labelId="select-outlined-label"
					id={props.id}
					name={props.name}
					value={props.value}
					onChange={props.handleChange}
					label={props.label}
					className={props.dropDownClass}
					color={props.color}
					size={props.size}
					defaultValue={props.defaultValue}
					{...props}
				>
					{
						// loop option data, if data is null empty array will be passed 
						(props.optionData || []).map((option, index) => {
							return (
								<MenuItem key={index} value={option[`${props.fieldAccessor || "id" || "name"}`]} disabled={ option.isDisable }>
									{props.multiple && <Checkbox checked={props.value.indexOf(option[`${props.fieldAccessor || "id" || "name"}`]) > -1} />}
									{option.icon && option.icon}	{option.name}
								</MenuItem>
							);
						})
					}
				</Select>
				<FormHelperText>{props.helperText}</FormHelperText>
			</FormControl>

		</Box>
		</>
	);
};

export default DropDown;
