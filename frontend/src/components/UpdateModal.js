import React from 'react';
import './UpdateModal.css';
import { Button } from 'reactstrap';

const UpdatePostModal = props => (
    <div className = 'newUpdateModal'>
        <header className="modal_header"><h1>{props.title}</h1></header>
        <section className="modal_content"></section>
            {props.children}
        <section className="modal_actions">
            {props.canCancel && <Button className="cancel_btn" color="danger" onClick={props.handleCancel}>Cancel</Button>}
            {props.canConfirm && <Button className="buttonColor" disabled={props.handleDisabled} onClick={props.handleClickPost}>Update</Button>}
        </section>
    </div>
);


export default UpdatePostModal;