import React, { Component } from 'react';
import home_03 from '../img/home_03.png';
import home_05 from '../img/home_05.png';

class ProfilePanel extends Component {
    render() {
        return (
            <div className="col-3">
                <div className="imaginary_container">
                    <div className="input-group stylish-input-group">
                        <span className="input-group-addon" id="logo-camera">
                            <img src={home_03} alt="camera-icon" />
                            <img src={home_05} alt="camera-icon" />
                        </span>
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePanel;