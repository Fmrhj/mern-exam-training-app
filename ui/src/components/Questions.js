import '../styles/App.css'
import '../styles/Questions.css'

import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, { Component } from 'react'

import AnswerForm from './AnswerForm'
import AnswerPanel from './AnswerPanel'
import ControlPanel from './ControlPanel'
import CustomDialog from './CustomDialog'
import PropTypes from 'prop-types'
import axios from 'axios'

const BASE_API_URL = process.env.REACT_APP_SERVER_API

class Questions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestionList: [],
      checkedOptions: [],
      checkedAlternatives: [],
      questions: [],
      setLength: 0,
      questionIndex: 0,
      selectedOption: 1,
      textInput: '',
      showAnswer: false,
      openDialog: false,
    }
  }
  static propTypes = {
    maxQuestionNumber: PropTypes.number,
  }
  static defaultProps = {
    maxQuestionNumber: 1,
  }

  componentDidMount = () => {
    this._getData(this.state.selectedOption)
  }

  _getData = async (questionSet) => {
    console.log('Refreshing data')
    const urlTmp = `${BASE_API_URL}/${questionSet}`
    try {
      const { data } = await axios.get(urlTmp)
      console.log(data)
      this.setState({
        questions: data.questions,
        setLength: data.questions.length,
      })

      this.setState({ selectedOption: questionSet })
      this._setCurrentQuestion()
      console.log(this.state.currentQuestionList)
    } catch (e) {
      console.error('Error', e)
    }
  }

  _getCurrentQuestionList = () => {
    const { questions, questionIndex } = this.state
    const currentQuestionList = questions.slice(
      questionIndex,
      questionIndex + this.props.maxQuestionNumber,
    )
    return currentQuestionList
  }

  static _putExplanationData = async (
    selectedOption,
    questionIndex,
    bodyData,
  ) => {
    const urlTmp = `${BASE_API_URL}/${selectedOption}/${questionIndex + 1}`
    console.log(urlTmp)
    try {
      const { res } = await axios.put(urlTmp, { explanation: bodyData })
      console.log(res)
    } catch (e) {
      console.error('Error', e)
    }
  }
  _handleShowAnswer = () => {
    this.setState({ showAnswer: true })
  }
  _handleHideAnswer = () => {
    this.setState({ showAnswer: false })
  }
  _handleClickNext = () => {
    let { questionIndex, questions } = this.state
    questionIndex =
      questionIndex < questions.length - 1 ? (questionIndex += 1) : 0

    this.setState({ questionIndex: questionIndex })
    this._handleHideAnswer()
  }

  _handleClickPrevious = () => {
    let { questionIndex, questions } = this.state
    questionIndex =
      questionIndex < questions.length - 1 ? (questionIndex -= 1) : 0
    this.setState({ questionIndex: questionIndex })
    this._handleHideAnswer()
  }

  _handleSelectChange = (selectedOption) => {
    this.setState({ questionIndex: 0 })
    this._getData(selectedOption.value)
    this._handleHideAnswer()
  }

  _handleAnswerChange = (inputFromTextField) => {
    this.setState({ textInput: inputFromTextField.target.value })
  }

  _handleSubmit = (event) => {
    event.preventDefault()
    Questions._putExplanationData(
      this.state.selectedOption,
      this.state.questionIndex,
      this.state.textInput,
    )
    this.setState({ textInput: '' })
    this.setState({ showAnswer: false })
    this._handleOpenDialog()
  }

  _handleCheckboxChange = (event) => {
    event.preventDefault()
    let optionMap = {}
    optionMap['option'] = event.target.value
    optionMap['isChecked'] = event.target.checked
    console.log('Printing Option Map')
  }

  _initializeAlternativesState = (questionData) => {
    let tmp = questionData.map((v) => {
      let tmpInner = Object.entries(v.alternatives).map(([index, val]) => {
        let tmpMap = {}
        tmpMap['option'] = index
        tmpMap['isChecked'] = false
        return tmpMap
      })
      return tmpInner
    })
    this.setState({ checkedAlternatives: tmp[0] })
  }

  _resetClick = () => {
    this.setState({ questionIndex: 0 })
    this._handleHideAnswer()
  }
  _handleOpenDialog = () => {
    this.setState({ openDialog: true })
  }
  _handleCloseDialog = () => {
    this.setState({ openDialog: false })
  }

  render() {
    let currQuestionList = this._getCurrentQuestionList()
    return (
      <div className="question-box">
        <CustomDialog
          dialogOpenState={this.state.openDialog}
          onClose={this._handleCloseDialog}
          dialogText={`Data succesfully updated!`}
        />

        <ControlPanel
          handleSelectChange={this._handleSelectChange}
          handleClickPrevious={this._handleClickPrevious}
          handleClickNext={this._handleClickNext}
          resetClick={this._resetClick}
          setLength={this.state.setLength}
        />
        {currQuestionList.map((v) => {
          return (
            <div>
              <Typography variant="h3" component="h3">
                Question {v.index}
              </Typography>
              <Typography>
                <p>{v.description}</p>
              </Typography>
              <Typography variant="h5" component="h3">
                Alternatives
              </Typography>

              <List>
                {Object.entries(v.alternatives).map(([key, val]) => {
                  return (
                    <ListItem key={key} dense button>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={this.state.checkedAlternatives[key]}
                          onChange={this._handleCheckboxChange}
                          tabIndex={1}
                          value={key}
                          disableRipple
                          inputProps={{ 'aria-labelledby': key }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={key}
                        primary={<Typography>{`${key}) ${val}`}</Typography>}
                      />
                    </ListItem>
                  )
                })}
              </List>
              <AnswerPanel
                showAnswer={this.state.showAnswer}
                answer={v.answer}
                explanation={v.explanation}
              />
              {!this.state.showAnswer && (
                <Button variant="outlined" onClick={this._handleShowAnswer}>
                  Show Answer
                </Button>
              )}
              <Box m="1rem" />

              {/* From here on is the submit form */}
              <AnswerForm
                formOnSubmit={this._handleSubmit}
                textFieldValue={this.state.textInput}
                textFieldOnChange={this._handleAnswerChange}
                refreshButtonOnClick={() =>
                  this._getData(this.state.selectedOption)
                }
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Questions
