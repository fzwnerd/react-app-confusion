import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { getByDisplayValue } from '@testing-library/react';

class DishDetail extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props.selectedDish);

        //this.state = {
        //    dish: this.props.selectedDish
        //};
    }

    renderDish(dish) {       
        return (           
            <Card>
                <CardImg top src={dish.image} alt={dish.alt} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );        
    }

    renderComments(comments) {
        const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    // Then apply the format to your date. In this function, replace (txt.date) with your own dish.comments Obj.
        
        const listItems = comments.map((comm) => {

            const formattedDate = (new Date(comm.date)).toLocaleDateString('en-US', dateOptions);

            return (
                <li>
                    <p>{comm.comment}</p>
                    <p>-- {comm.author}, {formattedDate}</p>
                </li>
            );
        });

        return (
            <div>
                <h4>comments</h4>
                <ul className="list-unstyled">
                    {listItems}
                </ul>
            </div>
        );
    }

    render() {
        if (this.props.selectedDish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;