import React from 'react';

import './footer.css';

const Footer = () =>{
    return (
      <footer className="page-footer d-flex flex-column justify-content-center">
        <div className="footer-content">
          <div className="row">
            <div>
              <h5 className="white-text">SAVR'S QUOTE OF THE DAY</h5>
              <p className="grey-text text-lighten-4 quote-container">Too many people spend money they earned..to buy things they don't want..to impress people that they don't like. <br/>--Will Rogers</p>
            </div>
            {/* <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="footer-copyright">
          <div>
          © 2022 SAVR APP, LLC
          {/* <a className="grey-text text-lighten-4 right" href="#!">More Links</a> */}
          </div>
        </div>
      </footer>
    );
}

export default Footer;