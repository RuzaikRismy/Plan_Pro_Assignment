import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Grid, Card, CardHeader, IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EventIcon from '@material-ui/icons/Event';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: '#1ABC9C', 
    color: '#000',
  },
  cardHeaderTitle: {
    color: '#FFFFFF', 
    fontWeight: 400, 
    fontSize: '18px', 
  },
  filterWordTypo:  {
    fontFamily:"Roboto",
    fontWeight: 500,
    fontSize: '14px'

  }
}));

const notifications = [
  { id: 1, type: 'event', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
  { id: 2, type: 'event', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
  { id: 3, type: 'success', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'completed' },
  { id: 4, type: 'report', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
  { id: 5, type: 'event', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
  { id: 6, type: 'event', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
  { id: 7, type: 'success', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'completed' },
  // { id: 8, type: 'report', title: 'Lorem Ipsum Is Simply Dummy Text', date: 'Aug 21, 2024', status: 'pending' },
];

const NotificationHandler = () => {
  const classes = useStyles();

  return (
    <Card  style={{ width: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title="Upcoming Event"
        classes={{
          title: classes.cardHeaderTitle,
        }}
        
        // action={
        //   <IconButton>
        //     <Typography className={classes?.filterWordTypo}>Filter by Date: All ▼</Typography>
        //   </IconButton>
        // }
      />
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} alignItems="flex-start" style={{borderBottom:"1px solid #F2F2F2"}}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: getStatusColor(notification.status) }}>
                {getNotificationIcon(notification.type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={notification.title}
              secondary={<Typography component="span" variant="body2" color="textSecondary">{notification.date}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'event':
      return <EventIcon />;
    case 'success':
      return <CheckCircleIcon />;
    case 'report':
      return <InsertChartIcon />;
    default:
      return <EventIcon />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'red';
    case 'completed':
      return 'green';
    case 'report':
      return 'yellow';
    default:
      return 'gray';
  }
};

export default NotificationHandler;
