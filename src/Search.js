import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import Swal from  'sweetalert2';
import Loader from './Loader';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            list: [],
            isLoading: true,
            error: false
        }

        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()

        const value = this.state.country[0]

        const date = new Date()
        const date2 = new Date(date - 691200000)

        const weekBefore = `${date2.getFullYear()}-${('0'+ (date2.getMonth() + 1)).slice(-2)}-${('0'+date2.getDate()).slice(-2)}`
        const now = `${date.getFullYear()}-${('0'+ (date.getMonth() + 1)).slice(-2)}-${('0'+date.getDate()).slice(-2)}`
        // console.log(now)
        try{
            this.props.search(value.Slug, weekBefore, now)
        }catch(e){
            // sweetalert
            Swal.fire({
                title: 'Oops',
                text: 'You typed invalid country name',
                icon: 'error',
                confirmButtonText: 'Ok, I understand'
              })
        }
    }

    handleOnchange(e){
        const countrySelected = this.state.list.filter(data => {
            return data.Country === e.target.value
        })

        this.setState({
            country: countrySelected
        })
    }

    render() {

        const countries = this.props.list.map((data, index) => <option key={index}>{data.Country}</option>)

        return (
            <form onSubmit={(e) => this.handleSubmit(e)} id="form-search" className="d-flex form-inline search col-12 p-0">
                <div className="form-group col-8 mx-sm-3 mb-2 m-0 p-0">
                    <input required onChange={this.handleOnchange} autoComplete="off" list="country" className="form-control badge-pill col-12 m-0 border-primary" placeholder="search country" />
                    <datalist id="country">
                        {countries}
                    </datalist>
                </div>
                <button type="submit" className="btn btn-primary pl-3 pr-3 mb-2 badge-pill">search</button>
            </form>
        );
    }
}

export default Search;
