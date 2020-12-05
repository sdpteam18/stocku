import React, { Component } from "react";
import PropTypes from 'prop-types';
import AlgoForm from '../AlgoForm/AlgoForm.js';


const AlgoModal = ({ children, closeModal, modalState, title }) => {
    if(!modalState) {
      return null;
    }
    
    return(
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="button is-danger">Watch A Tutorial</button>
            <div style={{padding:'5px'}}></div>
            <button className="delete" onClick={closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              {children}
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button is-link is-light" onClick={closeModal}>Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
  
  AlgoModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    title: PropTypes.string
  }

  export default AlgoModal;