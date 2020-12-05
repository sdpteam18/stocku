import React, { Component } from "react";
// import './AlgoDropdown.css';
import moment from 'moment'
import AlgoModal from '../AlgoModal/AlgoModal.js'
import AlgoForm from '../AlgoForm/AlgoForm.js';



function convertToTime(time){
    return moment(time).format("MM/DD/YYYY hh:mm a")
}



//look at bustabit
class AlgoDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lowAlgos: ["Momentum Investing","Mean Reversion","Factor-Based Investing"],
          midAlgos: ["ETF Rotation", "Smart Beta", "Trend Following"],
          highAlgos:["Sentiment Analysis","Statistical Arbitrage","Seasonality Strategies"],
          userAlgos:["My Algo 1", "Good Algo", "My Algo"],
          panelAlgos:[],
          modalState: false,
          currModalTitle: null,
          creatorModalState: false
        };

        this.toggleModal = this.toggleModal.bind(this);
      }
    
getAlgos = (algos) => {
        const panelList = algos.map((algo, index) => 
        <div>
        <a class="panel-block is-primary" key={index} onClick={() => { 
            this.setState({creatorModalState: false }); 
            this.toggleModal(algo);}}
        >
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        {algo}        
      </a>
    </div>
        );
      
      this.setState({
          panelAlgos: panelList
      })

}

toggleModal(title) { 
    this.setState({
        currModalTitle: title
    });

    this.setState((prev, props) => {
      const newState = !prev.modalState;
      
      return { modalState: newState };
    });
    
    if(this.state.creatorModalState){
        this.setState({
            creatorModalState: false
        })
    }
  }

toggleCreatorModal() { 
    this.setState({
        creatorModalState: !this.state.creatorModalState
    });
}


createModals = () => {
    console.log("modals loading");
    const modalNum = this.state.lowAlgos.length + this.state.midAlgos.length 
               + this.state.highAlgos.length + this.state.userAlgos.length;
    let modals = []       
    for(let i = 0; i < modalNum; i++){
        const className = this.state.activeIndex === i ? true : false;
        modals.push(<AlgoModal key={i} active={className}></AlgoModal>);
        console.log("modal pushed");
    } 
    return modals;
}

// https://stackoverflow.com/questions/40792164/change-active-element-in-a-list-using-react
setModalActive = (index) => {
 console.log("clicked");
 this.setState({
     activeIndex: index
 })
 console.log(this.state.activeIndex);
}


  render() {
    return (
        <div>
        <article class="panel is-warning">
  <p class="panel-heading">
    Algorithm Menu
  </p>
  <p class="panel-tabs">
    <a>All</a>
    <a onClick={() => this.getAlgos(this.state.userAlgos)}>Your Algos</a>
    <a onClick={() => this.getAlgos(this.state.lowAlgos)}>Low Risk</a>
    <a onClick={() => this.getAlgos(this.state.midAlgos)}>Mid Risk</a>
    <a onClick={() => this.getAlgos(this.state.highAlgos)}>High Risk</a>
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      {/* <input class="input is-primary" type="text" placeholder="Search"/> */}
      {/* <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span> */}
    <button class="button is-warning is-inverted" onClick={() => {this.toggleCreatorModal(); this.toggleModal();}}>Create Algorithm</button>
    </p>
  </div>
  {this.state.panelAlgos}
</article>
            {this.state.creatorModalState ? 
            <AlgoModal 
              closeModal={this.toggleModal} 
              modalState={this.state.modalState} 
              title={this.state.currModalTitle}
            >
            <AlgoForm></AlgoForm>
            </AlgoModal> :
            
            <AlgoModal
            closeModal={this.toggleModal} 
            modalState={this.state.modalState} 
            title={this.state.currModalTitle}
            >
         
            </AlgoModal>
            }
</div>
    );
  }
}

export default AlgoDropdown;