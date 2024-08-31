import React from 'react';
import { Avatar, Button, Box} from '@material-ui/core';
import { useStyles } from '../../../assets/styles/styles'

const TreeView = (props) => {
    const Classes = useStyles();

    return(
        <Box>
            <Box display="flex" alignItems="center">
                <Avatar className={Classes.blueDarkAvatarWrapper}>
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                        className={Classes.blueDarkAvatar}
                        >
                        {props.structureData.symbol}
                    </Box>
                </Avatar>
                <Button className={Classes.avatarBtn}>{props.structureData.name}</Button>
            </Box>
            {
                props.structureData.child &&
                <ul className={Classes.hierarchyList}>
                    {
                        props.structureData.child.map((singlePrimaryItem) => (
                            <li className={Classes.listItem}>
                                <Box display="flex" alignItems="center">
                                    <Avatar className={Classes.blueLightAvatarWrapper}>
                                        <Box display="flex" alignItems="center" justifyContent="center"
                                                className={Classes.blueLightAvatar}>{ singlePrimaryItem.symbol }</Box>
                                    </Avatar>
                                    <Button className={Classes.avatarBtn}>{ singlePrimaryItem.name }</Button>
                                </Box>
                                {
                                    singlePrimaryItem.child &&
                                    <ul className={Classes.hierarchyList}>
                                        {
                                            singlePrimaryItem.child.map((singleSecondaryItem) => (
                                                <li className={Classes.listItem}>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar className={Classes.blueAvatarWrapper}>
                                                            <Box display="flex" alignItems="center" justifyContent="center" className={Classes.blueAvatar}>{singleSecondaryItem.symbol}</Box>
                                                        </Avatar>
                                                        <Button className={Classes.avatarBtn}>{singleSecondaryItem.name}</Button>
                                                    </Box>
                                                    {
                                                        singleSecondaryItem.child &&
                                                        <ul className={Classes.hierarchyList}>
                                                            {
                                                                singleSecondaryItem.child.map((singleTertiaryItem) => (
                                                                    <li className={Classes.listItem}>
                                                                        <Box display="flex" alignItems="center">
                                                                            <Avatar className={Classes.blueMidAvatarWrapper}>
                                                                                <Box display="flex" alignItems="center" justifyContent="center" className={Classes.blueMidAvatar}>{ singleTertiaryItem.symbol }</Box>
                                                                            </Avatar>
                                                                            <Button className={Classes.avatarBtn}>{ singleTertiaryItem.name }</Button>
                                                                        </Box>
                                                                        {
                                                                            singleTertiaryItem.child &&
                                                                            <ul className={Classes.hierarchyList}>
                                                                                {
                                                                                    singleTertiaryItem.child.map((singleQuaternaryItem) => (
                                                                                        <li className={Classes.listItem}>
                                                                                            <Box display="flex" alignItems="center">
                                                                                                <Avatar className={Classes.greenLightAvatarWrapper}>
                                                                                                    <Box display="flex" alignItems="center" justifyContent="center" className={Classes.greenLightAvatar}>{singleQuaternaryItem.symbol}</Box>
                                                                                                </Avatar>
                                                                                                <Button className={Classes.avatarBtn}>{ singleQuaternaryItem.name }</Button>
                                                                                            </Box>
                                                                                            {
                                                                                                singleQuaternaryItem.child &&
                                                                                                <ul className={Classes.hierarchyList}>
                                                                                                    {
                                                                                                        singleQuaternaryItem.child.map((singleQuinaryItem) => (
                                                                                                            <li className={Classes.listItem}>
                                                                                                                <Box display="flex" alignItems="center">
                                                                                                                    <Avatar className={Classes.peacockBlueAvatarWrapper}>
                                                                                                                        <Box display="flex" alignItems="center" justifyContent="center" className={Classes.peacockBlueAvatar}>{singleQuinaryItem.symbol}</Box>
                                                                                                                    </Avatar>
                                                                                                                    <Button className={Classes.avatarBtn}>{singleQuinaryItem.name}</Button>
                                                                                                                </Box>
                                                                                                            </li>
                                                                                                        ))
                                                                                                    }
                                                                                                </ul>
                                                                                            }
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        }
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }
                                            </li>
                                            ))
                                        }
                                    </ul>
                                }
                            </li>
                        ))
                    }
                </ul>
            }
        </Box>
    );
}

export default TreeView;