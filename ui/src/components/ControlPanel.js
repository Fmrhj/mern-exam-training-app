import '../styles/Questions.css'

import { Badge, Box, Divider, IconButton, Tooltip } from '@material-ui/core'
import {
  FeaturedPlayList,
  KeyboardReturn as KeyboardReturnIcon,
  NavigateBefore,
  NavigateNext,
} from '@material-ui/icons'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Select from 'react-select'

// Get the data it with a GET request
const setOptions = []
for (let i = 1; i < 5; i++) {
  setOptions[i] = { value: i, label: `Questions set ${i}` }
}

class ControlPanel extends Component {
  static propTypes = {
    handleClickPrevious: PropTypes.func,
    handleClickNext: PropTypes.func,
    handleSelectChange: PropTypes.func,
    resetClick: PropTypes.func,
    setLength: PropTypes.number,
    fontSize: PropTypes.string,
    iconClassName: PropTypes.string,
    spaceBetween: PropTypes.string,
  }

  static defaultProps = {
    fontSize: 'medium',
    iconClassName: 'header__icon',
    setOptions: setOptions,
    spaceBetween: '2rem',
  }

  render() {
    return (
      <div>
        <Select
          onChange={this.props.handleSelectChange}
          options={this.props.setOptions}
          defaultValue={{ label: 'Questions set 1', value: 1 }}
          autoFocus={true}
        />
        <div className="question-control">
          <Tooltip title="Go back">
            <IconButton onClick={this.props.handleClickPrevious}>
              <NavigateBefore
                fontSize={this.props.fontSize}
                className={this.props.iconClassName}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go forward">
            <IconButton onClick={this.props.handleClickNext}>
              <NavigateNext
                fontSize={this.props.fontSize}
                className={this.props.iconClassName}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restart">
            <IconButton onClick={this.props.resetClick}>
              <KeyboardReturnIcon
                fontSize={this.props.fontSize}
                className={this.props.iconClassName}
              />
            </IconButton>
          </Tooltip>
        </div>
        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
          <Badge badgeContent={this.props.setLength} color="primary">
            <FeaturedPlayList />
          </Badge>
        </Box>
        <Divider />
        <Box m={this.props.spaceBetween} />
      </div>
    )
  }
}

export default ControlPanel
