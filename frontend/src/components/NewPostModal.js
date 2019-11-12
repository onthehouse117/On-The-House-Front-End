import React from 'react';
import './NewPostModal.css';
import { Button } from 'reactstrap';

const NewPostModal = props => (
    <div className = 'newPostModal'>
        <header className="modal_header"><h1>{props.title}</h1></header>
        <section className="modal_content"></section>
            {props.children}
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <form class="form-inline">
            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Select Community</label>
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                <option selected>Communities...</option>
                <option value="1">Plaza Verde</option>
                <option value="2">Puerta Del Sol</option>
                <option value="3">Arroyo Vista</option>
                <option value="4">Vista Del Campo Norte</option>
                <option value="5">Camino Del Sol</option>
                <option value="6">Vista Del Campo</option>
                <option value="7">UTC</option>
            </select>
            </form>
        <section className="modal_actions">
            {props.canCancel && <Button color="primary" onClick={props.handleCancel}>Cancel</Button>}
            {props.canConfirm && <Button color="danger">Post</Button>}
        </section>
    </div>
);




export default NewPostModal;