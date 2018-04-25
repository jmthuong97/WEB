import React, { Component } from 'react';

class SearchField extends Component {
    render() {
        return (
            <form className="col-3">
                <div className="input-group stylish-input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <span className="input-group-addon">
                        <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </span>
                </div>
            </form>
        );
    }
}

export default SearchField;