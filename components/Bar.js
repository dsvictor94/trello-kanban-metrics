import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';

const Bar = ({children, title, fething = false, iconElementRight}, context) => {
  const {baseTheme: {palette}} = context.muiTheme;
  const loaderStyle = {
    borderRadius: 0,
    backgroundColor: palette.primary1Color,
    zIndex: '1200',
    ...{visibility: fething ? 'visible' : 'hidden'}
  };

  const barStyle = {
    top: '-4px'
  };

  return <div style={{width: '100%'}}>
    <LinearProgress mode='indeterminate'
      color={palette.accent1Color}
      style={loaderStyle}
    />
    <AppBar
      title={title}
      color={'#ff4081'}
      style={barStyle}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      iconElementRight={iconElementRight}
    />
  </div>;
};

Bar.contextTypes = {muiTheme: React.PropTypes.object};

export default Bar;
