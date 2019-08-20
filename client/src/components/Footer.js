import React, { Component } from 'react';
import { Container} from 'react-bootstrap';

class Footer extends Component {
    state = {  }
    render() { 
        return ( <footer className="main_footer">
            <Container>
                <div> © 2019 智媒科技 </div>
            </Container>
        </footer> );
    }
}
 
export default Footer;