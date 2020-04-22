import React from 'react';
import Copyright from './Copyright';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import Swal from 'sweetalert2';
import Illustration from './illustration/Location.png'
import Loader from './Loader';
import AOS from 'aos';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            list: [],
            isLoading: true,
            error: false,
            summary: []
        }

        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.covid19api.com/countries').then(response => response.json()).then(response => {
            this.setState({
                list: response,
                isLoading: false
            })
        }).catch(e => {
            console.error(e)
            this.setState({
                error: true
            })
        })

        fetch('https://api.covid19api.com/summary').then(response => response.json()).then(response => {
            this.setState({
                summary: response.Global,
                isLoading: false
            })
        }).catch(e => {
            console.error(e)
            this.setState({
                error: true
            })
        })

        AOS.init({
            startEvent: 'DOMContentLoaded'
        });
    }

    handleSubmit(e) {
        e.preventDefault()

        const value = this.state.country[0]

        const date = new Date()
        const date2 = new Date(date - 604800000)

        const weekBefore = `${date2.getFullYear()}-${('0' + (date2.getMonth() + 1)).slice(-2)}-${('0' + date2.getDate()).slice(-2)}`
        const now = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
        // console.log(now)
        try {
            this.props.search(value.Slug, weekBefore, now)
        } catch (e) {
            // sweetalert
            Swal.fire({
                title: 'Oops',
                text: 'You typed invalid country name',
                icon: 'error',
                confirmButtonText: 'Ok, I understand'
            })
        }
    }

    handleOnchange(e) {
        const countrySelected = this.state.list.filter(data => {
            return data.Country === e.target.value
        })

        this.setState({
            country: countrySelected
        })
    }
    render() {
        const countries = this.state.list.map((data, index) => <option key={index}>{data.Country}</option>)
        if (this.state.isLoading && !this.state.error) {
            return (
                <Loader />
            )
        } else if (this.state.error) {
            return (
                <div>
                    error
                </div>

            )
        } else {
            const numeral = require('numeral');
            return (
                <div id="home-container" className="row col-12 p-md-4 p-0 m-0">
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom" data-aos-duration="2000" className="col-md-6 col-12 m-0 order-md-2 order-1 ">
                        <img src={Illustration} alt="banner.jpg" className="col-12 m-0 items-align-start" />
                        <div className="col-12 row text-center" id="desktop-copyright">
                            <Copyright/>
                        </div> 
                    </div>
                    <div className="order-md-1 order-2 d-flex col-md-6 col-12 m-0 items-align-stretch p-0">
                        <div data-aos="fade-up"
                            data-aos-anchor-placement="center-bottom" data-aos-duration="2500" id="bg-container-widget" className="col-12 m-0">
                            <div id="text-banner" className="col-12 mt-md-5 mt-0 p-0">
                                <h1 className="text-death text-banner">Welcome</h1>
                                <p className="text-secondary" >
                                    Check latest information about Corona virus
</p>
                                <form onSubmit={(e) => this.handleSubmit(e)} id="form-search" className="form-inline search col-12 p-0">
                                    <div className="form-group col-md-6 col-9 m-0 p-0">
                                        <input required onChange={this.handleOnchange} autoComplete="off" list="country" className="form-control badge-pill col-12 m-0 border-primary" placeholder="search country" />
                                        <datalist id="country">
                                            {countries}
                                        </datalist>
                                    </div>
                                    <button type="submit" className="btn btn-primary pl-3 pr-3 mb-2 badge-pill">search</button>
                                </form>

                            </div>
                            <h4 className="text-confirm mt-3">World summary</h4>
                            <div className="col-12 m-0 row p-0">
                                <div className="col-md-5 col-6 p-1 d-flex align-items-stretch m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="2000">
                                        <h5 className="text-secondary">New Recovered</h5>
                                        <h1 className="text-recover-new text-center">{numeral(this.state.summary.NewRecovered).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                                <div className="col-md-7 col-6 p-1 d-flex align-items-stretch m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="2250">
                                        <h5 className="text-secondary">Total Recovered</h5>
                                        <h1 className="text-recover text-center">{numeral(this.state.summary.TotalRecovered).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                                <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="2500">
                                        <h5 className="text-secondary">New Death</h5>
                                        <h1 className="text-death-new text-center">{numeral(this.state.summary.NewDeaths).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                                <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="2750">
                                        <h5 className="text-secondary">Total Deaths</h5>
                                        <h1 className="text-death text-center">{numeral(this.state.summary.TotalDeaths).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                                <div className="col-md-5 col-12 p-1 m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="3000">
                                        <h5 className="text-secondary">New Confirmed</h5>
                                        <h1 className="text-confirm text-center">{numeral(this.state.summary.NewConfirmed).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                                <div className="col-md-7 col-12 p-1 m-0">
                                    <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                        data-aos-anchor-placement="center-bottom" data-aos-duration="3000">
                                        <h5 className="text-secondary">Total Confirmed</h5>
                                        <h1 className="text-confirm text-center">{numeral(this.state.summary.TotalConfirmed).format('0,0').replace(',','.')}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0" id="mobile-copyright">
                                <Copyright />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;
