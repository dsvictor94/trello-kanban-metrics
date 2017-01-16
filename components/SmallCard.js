import React from 'react';
import Paper from 'material-ui/Paper';

import css from './SmallCard.css';

const SmallCard = ({children, icon, title}, context) => {
  icon = React.cloneElement(icon, {style: {display: 'block', width: '100%', height: '100%'}});
  return (
    <Paper className={css.smallCard}>
      <div className={css.icon}>{icon}</div>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    </Paper>);
};

SmallCard.contextTypes = {muiTheme: React.PropTypes.object};

export default SmallCard;
