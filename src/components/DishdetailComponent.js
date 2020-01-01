import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Modal, Button, ModalHeader, ModalBody, Label, Input, Col, Row, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderDish({dish}) {
        return (           
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.alt} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );      
    }

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            //console.log("Current State is: " + JSON.stringify(values));
            //alert("Current State is: " + JSON.stringify(values));
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rate, values.name, values.message);
            //alert('aaa');
            //var e = document.getElementById("rate");
            //alert(e.options[e.selectedIndex].text);
        }

        render() {
            return (
                <>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fas fa-pencil-alt"></i> Submit Comment
                    </Button>
                    <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <FormGroup>                                    
                                        <Label htmlFor="rate">Rating</Label>                                   
                                        <Control.select model=".rate" name="rate"
                                            className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                        </Control.select>                                                                         
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" name="name"
                                        placeholder="John Doe" 
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        >                                       
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{ 
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }

    function RenderComments({comments, postComment, dishId}) {
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
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
            
        );
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            //console.log('aaaa');
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.selectedDish != null) {
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
                            <RenderComments comments={props.comments} 
                                postComment={props.postComment}
                                dishId = {props.selectedDish.id}
                            />
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