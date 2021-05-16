import '../styles/Questions.css'

import { Box, Typography } from '@material-ui/core'
import React, { Component } from 'react'

import PropTypes from 'prop-types'

class AnswerPanel extends Component {
  static propTypes = {
    showAnswer: PropTypes.bool,
    answer: PropTypes.array,
    explanation: PropTypes.string,
    rootClassName: PropTypes.string,
    spaceBetween: PropTypes.string,
  }
  static defaultProps = {
    rootClassName: 'question-answer',
    spaceBetween: '2rem',
  }

  render() {
    return (
      <div>
        {this.props.showAnswer && (
          <div className={this.props.rootClassName}>
            <Typography variant="h5" component="h3">
              Answer
            </Typography>
            <Box m={this.props.spaceBetween} />
            <Typography>{this.props.answer.join(', ')}</Typography>
            <Box m={this.props.spaceBetween} />
            <Typography variant="h5" component="h3">
              Explanation
            </Typography>
            <Box m={this.props.spaceBetween} />
            <Typography>{this.props.explanation}</Typography>
            <Box m={this.props.spaceBetween} />
          </div>
        )}
      </div>
    )
  }
}

export default AnswerPanel
