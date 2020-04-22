import React from 'react';
import Loader from './Loader';
import Copyright from './Copyright';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Chart = require("chart.js");

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            dataDates: [],
            confirmed: 0,
            totalRecovered: 0,
            newRecovered: 0,
            totalDeaths: 0,
            newDeath: 0
        }

        this.handleBackHome = this.handleBackHome.bind(this)
    }
    componentDidMount() {
        const country = this.props.query.country
        const weekBefore = new Date(this.props.query.weekBefore).getTime()
        const now = new Date(this.props.query.now).getTime()
        // var d4 = new Date(weekBefore[2], weekBefore[1], weekBefore[0]); 

        fetch(`https://api.covid19api.com/total/country/${country}`).then(response => response.json()).then(response => {
            // eslint-disable-next-line
            const responseData = response.filter(data => {

                const dateData = new Date(data.Date.substr(0, 10)).getTime()
                if (weekBefore <= dateData && dateData <= now) {
                    return data
                }
            })

            const dataRecovered = responseData.map(data => data.Recovered)
            const dataDeath = responseData.map(data => data.Deaths)
            const dataConfirm = responseData.map(data => data.Confirmed)

            let monthTmp = ''
            const dataDates = responseData.map(data => {

                let d = new Date(data.Date.substr(0, 10))

                if (monthTmp === d.toString().substring(4, 7)) {
                    return d.toString().substring(8, 10)
                } else {
                    monthTmp = d.toString().substring(4, 7)
                    console.log(d.toString().substring(4, 10))
                    return d.toString().substring(4, 10)
                }
            })

            const confirmed = dataConfirm[dataConfirm.length - 1]
            const totalRecovered = dataRecovered[dataRecovered.length - 1]
            const totalDeaths = dataDeath[dataDeath.length - 1]
            const newRecovered = totalRecovered - dataRecovered[dataRecovered.length - 2]
            const newDeath = totalDeaths - dataDeath[dataDeath.length - 2]

            this.setState({
                isLoading: false,
                data: responseData,
                dataDates: dataDates,
                confirmed: confirmed,
                totalRecovered: totalRecovered,
                newRecovered: newRecovered,
                totalDeaths: totalDeaths,
                newDeath: newDeath
            })
        })
    }

    componentDidUpdate() {

        const node = this.node;
        const dataRecovered = this.state.data.map(data => data.Recovered)
        const dataDeath = this.state.data.map(data => data.Deaths)
        const dataConfirm = this.state.data.map(data => data.Confirmed)
        let dataDate = this.state.dataDates
        // dataDate = dataDate.fill("")

        new Chart(node, {
            type: "line",
            data: {
                labels: dataDate,
                datasets: [
                    {
                        label: "Recovered",
                        data: dataRecovered,
                        borderColor: [
                            "#66e9ff",
                        ], pointBackgroundColor: "#66e9ff",
                        backgroundColor: "#cff8ff"
                    },
                    {
                        label: "Death",
                        data: dataDeath,
                        borderColor: [
                            "#ff5ce0"
                        ],
                        pointBackgroundColor: "#ff5ce0",
                        backgroundColor: "#ffcff6"
                    },
                    {
                        label: "Confirmed",
                        data: dataConfirm,
                        borderColor: [
                            "#6e7aff"
                        ],
                        pointBackgroundColor: "#6e7aff",
                        backgroundColor: "#cfd3ff"
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }

        });

        AOS.init({
            startEvent: 'DOMContentLoaded'
        });

    }

    handleBackHome() {
        this.props.resetSearch(false)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Loader />
            )
        } else {
            const numeral = require('numeral');
            return (
                <div id="container" className="col-md-11 m-auto col-12 row p-0">
                    <div className="col-md-9 col-12 m-0 p-md-2 p-0 row">
                        <div id="chart-container" className="col-12 m-0 rounded p-0" data-aos="fade-up"><canvas
                            style={{ width: 1500, height: 900 }}
                            ref={node => (this.node = node)}
                        /></div>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom" data-aos-duration="2500" id="bg-container-widget" className="col-md-3 col-12 row m-0 p-0">
                        <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                            <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom" data-aos-duration="2000">
                                <h5 className="text-secondary">New Recovered</h5>
                                <h1 className="text-recover-new text-center">{numeral(this.state.newRecovered).format('0,0').replace(',','.')}</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                            <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom" data-aos-duration="2250">
                                <h5 className="text-secondary">Total Recovered</h5>
                                <h1 className="text-recover text-center">{numeral(this.state.totalRecovered).format('0,0').replace(',','.')}</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                            <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom" data-aos-duration="2500">
                                <h5 className="text-secondary">New Death</h5>
                                <h1 className="text-death-new text-center">{numeral(this.state.newDeath).format('0,0').replace(',','.')}</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-6 p-1 d-flex align-items-stretch m-0">
                            <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom" data-aos-duration="2750">
                                <h5 className="text-secondary">Total Deaths</h5>
                                <h1 className="text-death text-center">{numeral(this.state.totalDeaths).format('0,0').replace(',','.')}</h1>
                            </div>
                        </div>
                        <div className="col-md-12 col-12 p-1 m-0">
                            <div className="bg-white shadow-sm col-12 m-0 p-2 rounded" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom" data-aos-duration="3000">
                                <h5 className="text-secondary">Total Confirmed</h5>
                                <h1 className="text-confirm text-center">{numeral(this.state.confirmed).format('0,0').replace(',','.')}</h1>
                            </div>
                            <button id="home-button-lg" onClick={this.handleBackHome} className="btn btn-primary col-12 m-0">back to home</button>
                        </div>
                        <div className="col-12 row d-flex justify-content-center m-0 p-0" id="mobile-copyright">
                            <Copyright />
                        </div>
                    </div>
                    <button id="home-button-mobile" onClick={this.handleBackHome} className="btn btn-primary col-12 m-0">back to home</button>
                    <div className="col-12 row d-flex justify-content-center m-0 p-0" id="desktop-copyright">
                    <Copyright />
                </div>
                </div>
            )
        }
    }

}

export default Detail;
