import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTrips, fetchTripImage } from '../actions/trips'
import { NavLink } from 'react-router-dom'
import ConnectedNavbar from './Navbar'
import TripTile from './tripTile'

class MyTrips extends Component {
  componentWillMount() {
    let token = this.props.account.token
    this.props.fetchTrips(token)
  }
  listTrips() {
    return this.props.trips.map((trip) => {
      return <TripTile key={trip.id} trip={trip}/>
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.trips.length === 0 ? <h3>No trips planned yet? Get moving, <NavLink to="/addtrip">add</NavLink> one now</h3> : this.listTrips()}
        </ul>
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    trips: state.Trip,
    account: state.Account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchTrips: fetchTrips,
    fetchTripImage: fetchTripImage
  }, dispatch)
}


const ConnectedMyTrips = connect(mapStateToProps, mapDispatchToProps)(MyTrips)

export default ConnectedMyTrips
