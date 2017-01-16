import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LinearProgress from 'material-ui/LinearProgress';

const Bar = ({children, title, fething = false, iconElementRight}, context) => {
  const {baseTheme: {palette}} = context.muiTheme;
  const loaderStyle = {
    position: 'absolute',
    borderRadius: 0,
    backgroundColor: palette.primary1Color,
    zIndex: '1200',
    ...{visibility: fething ? 'visible' : 'hidden'}
  };

  return <div style={{width: '100%', position: 'relative'}}>
    <LinearProgress mode='indeterminate'
      color={palette.accent1Color}
      style={loaderStyle}
    />
    <AppBar
      title={title}
      color={'#ff4081'}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      iconElementRight={iconElementRight}
    />
  </div>;
};

Bar.contextTypes = {muiTheme: React.PropTypes.object};

export default Bar;
