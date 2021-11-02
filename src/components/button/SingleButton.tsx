import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchBtnStatus} from "../../store/actions/toggleAction"
import {RootState} from "../../store/reducers/index"


const useStyles = makeStyles({
    container: {
        width: "13vw",
        height: "13vh",
        fontFamily:"Cursive",
        background: 'lightBlue',
        borderRadius: '20px',
        justifyContent : "space-evenly",
        padding:"5px",
        cursor: "pointer",
        '&:hover': {
            boxShadow: '3px 3px 3px black',
        },
    },
    title: { 
        display: 'block',
        textAlign: 'center',
        width: "100%",
    },
    infomation: { 
        display: 'block',
        textAlign: 'center',
        width: "100%",
    }
  });

  interface Props{
    flareTemp?: any
    waterTemp ?: any
    casingPressure?: any
    oilTemp?: any
    tubingPressure?: any
    injValveOpen?: any
    switchBtnStatus?:any
    info?:any
}

const SingleButton = (props:Props) => {
    const styles = useStyles() 
    let currentBtn;
    let backGroundColor;
    if(props.info.metric === "flareTemp") { //set the btn color and btn name
        currentBtn = props.flareTemp
        backGroundColor = "#FC7C00"
    }
    if(props.info.metric === "waterTemp") {
        currentBtn = props.waterTemp
        backGroundColor = "#8932CC"
    }
    if(props.info.metric === "casingPressure") {
        currentBtn = props.casingPressure
        backGroundColor = "#9FBC8F"
    }
    if(props.info.metric === "oilTemp") {
        currentBtn = props.oilTemp
        backGroundColor ="#01CED1"
    }
    if(props.info.metric === "tubingPressure") {
        currentBtn = props.tubingPressure
        backGroundColor = "#7F1493"
    }
    if(props.info.metric === "injValveOpen") {
        currentBtn = props.injValveOpen
        backGroundColor = "#6CD700" 
    }
    const handleOnClick = ()=>{ //click to toggle the btn 
        console.log(props.info.metric)
        props.switchBtnStatus(props.info.metric)
    }
    return (
    <div >
        <div 
        onClick={handleOnClick} 
        className={styles.container}  
        style={{opacity: currentBtn ? '0.9' : '0.3', backgroundColor: backGroundColor }}
        >
            <h3 className={styles.title}>
                {props.info.metric}
            </h3>
            <p className={styles.title}>
                {props.info.value} {props.info.unit} 
            </p>
        </div>
    </div>)
}

const mapStatetoProps = (state:RootState) =>{
    return {
        //full 30 min data
        flareTemp: state.statusReducer.flareTemp,
        waterTemp : state.statusReducer.waterTemp,
        casingPressure: state.statusReducer.casingPressure,
        oilTemp: state.statusReducer.oilTemp,
        tubingPressure: state.statusReducer.tubingPressure,
        injValveOpen: state.statusReducer.injValveOpen,
    }
  }
  
  const mapDispatchToProps = (dispatch:any):any =>
        bindActionCreators({
            switchBtnStatus
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(SingleButton);