import React, { Component } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import _ from 'lodash';
import Form from 'react-bootstrap/Form';

class ReportIcon extends Component {

  //console.log("In CommentIcon props are", props);

  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      DisplayRep: false
    }

  }



  displayReport= () => {

    this.DisplayRep = ! this.DisplayRep;
    this.setState({
        DisplayRep: !this.state.DisplayRep
      });

  };


  render() {



    return (

        <React.Fragment>
            <div className="like-container">
                    <i onClick={this.displayReport} className="fa fa-flag fa-2x" aria-hidden="true"></i>
            </div>

            { this.state.DisplayRep &&

                <div>

                    <div>
                        <label>
                            <input type="checkbox" id="Tier1" name="Tier1" />
                            <label for="Tier1">Tier-1</label>

                        </label>

                        <label>
                            <input type="checkbox" id="Tier2" name="Tier2" />
                            <label for="Tier2">Tier-2</label>

                        </label>

                        <label>
                            <input type="checkbox" id="Tier3" name="Tier3" />
                            <label for="Tier3">Tier-3</label>
                        </label>

                    </div>



                    <Form >
                      <Form.Group >

                          <Form.Control as="textarea" rows="3"  type="text" />


                          <div className="profile-btn-container">
                            <button >Report</button>
                            <button >Cancel Report</button>
                          </div>

                      </Form.Group>
                   </Form>
                </div>

            }


        </React.Fragment>


    );
  }
}

export default ReportIcon;
