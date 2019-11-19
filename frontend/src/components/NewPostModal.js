import React from 'react';
import './NewPostModal.css';
import { Button } from 'reactstrap';

const NewPostModal = props => (
    <div className = 'newPostModal'>
        <header className="modal_header"><h1>{props.title}</h1></header>
        <section className="modal_content"></section>
            {props.children}
        <section className="modal_actions">
            {props.canCancel && <Button className="cancel_btn" color="danger" onClick={props.handleCancel}>Cancel</Button>}
            {props.canConfirm && <Button className="buttonColor" disabled={props.handleDisabled} onClick={props.handleClickPost}>Post</Button>}
        </section>
    </div>
);




export default NewPostModal;