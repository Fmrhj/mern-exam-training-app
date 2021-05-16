import { Button, Dialog, DialogTitle, Typography } from '@material-ui/core'
import React, { Component } from 'react'

import PropTypes from 'prop-types'

class CustomDialog extends Component {
  static propTypes = {
    dialogOpenState: PropTypes.bool,
    onClose: PropTypes.func,
    dialogText: PropTypes.string,
    exitText: PropTypes.string,
  }

  static defaultProps = {
    exitText: 'exit',
  }
  render() {
    return (
      <Dialog open={this.props.dialogOpenState} onClose={this.props.onClose}>
        <DialogTitle>
          <Typography>{this.props.dialogText}</Typography>
        </DialogTitle>
        <Button onClick={this.props.onClose}>{this.props.exitText}</Button>
      </Dialog>
    )
  }
}

export default CustomDialog
