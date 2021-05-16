import {
  Box,
  Divider,
  Fab,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { Publish as PublishIcon, Sync as RefreshIcon } from '@material-ui/icons'
import React, { Component } from 'react'

import PropTypes from 'prop-types'

class AnswerForm extends Component {
  static propTypes = {
    formOnSubmit: PropTypes.func,
    textFieldValue: PropTypes.string,
    textFieldOnChange: PropTypes.func,
    refreshButtonOnClick: PropTypes.func,
    spaceBetween: PropTypes.string,
  }
  static defaultProps = {
    spaceBetween: '2rem',
  }

  render() {
    return (
      <div>
        <Box m="1rem" />
        <form onSubmit={this.props.formOnSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Complete explanation"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            value={this.props.textFieldValue}
            onChange={this.props.textFieldOnChange}
          />
          <Box m={this.props.spaceBetween} />
          <Grid container justify="center" spacing={2}>
            <Grid item xs={1.5}>
              <Tooltip title="Submit new data">
                <Fab color="primary">
                  <IconButton type="submit" aria-label="submitButton">
                    <PublishIcon />
                  </IconButton>
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={1.5}>
              <Tooltip title="Refresh data">
                <Fab>
                  <IconButton onClick={this.props.refreshButtonOnClick}>
                    <RefreshIcon />
                  </IconButton>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
        <Box m={this.props.spaceBetween} />
        <Divider />
        <Box m={this.props.spaceBetween} />
      </div>
    )
  }
}

export default AnswerForm
