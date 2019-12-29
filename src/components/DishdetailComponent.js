import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


    function RenderDish({dish}) {
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
    

    function RenderComments({comments}) {
        const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    // Then apply the format to your date. In this function, replace (txt.date) with your own dish.comments Obj.
        
        const listItems = comments.map((comm) => {

            const formattedDate = (new Date(comm.date)).toLocaleDateString('en-US', dateOptions);

            return (
                <li key={comm.id}>
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

    const DishDetail = (props) => {
        if (props.selectedDish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.selectedDish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.selectedDish.name}</h3>
                            <hr />
                        </div>                       
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.selectedDish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
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


export default DishDetail;