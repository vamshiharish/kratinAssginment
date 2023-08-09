import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../appointmentitems'

import './index.css'


// format(new Date(dateInput) '{YYYY} MM-DDTHH:mm:ss SSS [Z] A')


class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    timeinput: '',
    description: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeTimeInput = event => {
    this.setState({timeinput: event.target.value})
  }
  onChangeDescriptionInput = event => {
    this.setState({description: event.target.value})
  }
  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput, timeinput, description} = this.state
    // console.log(dateInput)
    const formattedDate = dateInput
    ? format(new Date(dateInput), `EEE MM dd yyyy`)
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      time: timeinput,
      description: description,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
      description: '',
      timeinput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    console.log(appointmentsList)

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  checkAppointments = () => {
    const now = new Date();
    const currentDate = format(now, 'dd MM yyyy HH mm ss')
    
    const { appointmentsList } = this.state;
    
    for (const appointment of appointmentsList) {
      const appointmentYear = appointment.date.slice(10,14)
      
      const appointmentMonth = appointment.date.slice(4,6)
      
      const appointmentDay = appointment.date.slice(7,9)
      
      const appointmentHours = appointment.time.slice(0,2)
  
      const appointmentMinutes = appointment.time.slice(3,5)
  
      const appointmentSeconds = "00"
      const appointmentdatecompare = appointmentDay.concat(" ").concat(appointmentMonth).concat(" ").concat(appointmentYear).concat(" ").concat(appointmentHours).concat(" ").concat(appointmentMinutes).concat(" ").concat(appointmentSeconds)
      //console.log(appointmentdatecompare)
      if (currentDate === appointmentdatecompare) {
        this.setAlert(appointment.description);
      }
    }
  };
  
  setAlert = (message) => {
    alert(`Reminder: ${message}`);
  };
  
  componentDidMount() {
    this.interval = setInterval(this.checkAppointments, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {titleInput, dateInput, timeinput, description, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment and Reminders</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <label htmlFor='timer' className="label">TIME</label>
                <input type='time' id="timer" value={timeinput} className='input' placeholder='HH:MM:SS' onChange={this.onChangeTimeInput}/>
                
                <label htmlFor='timer' className="label">Description</label>
                <input type='text' id="timer" value={description} className='input' placeholder='Enter your Reminder' onChange={this.onChangeDescriptionInput}/>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments and Reminders</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments