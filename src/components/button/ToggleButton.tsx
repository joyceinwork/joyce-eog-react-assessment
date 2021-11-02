import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleButton from "./SingleButton";
import {RootState} from "../../store/reducers/index"


const useStyles = makeStyles({
    container: {
        height: '12vh',
        display: "flex",
        justifyContent : "space-evenly",
        alignItems: "center",
        fontFamily:"Cursive",
    },
  });

  interface Props{
    lastFlareTemp ?: any
      lastWaterTemp ?: any
      lastCasingPressure?: any
      lastOilTemp?: any
      lastTubingPressure?: any
      lastInjValveOpen?: any
  }
const ToggleButton = (props:Props) =>{
    const styles = useStyles();
    return (
        <div className={styles.container} >
          <SingleButton info = {props.lastFlareTemp} />
          <SingleButton info = {props.lastWaterTemp} />
          <SingleButton info = {props.lastCasingPressure} />
          <SingleButton info = {props.lastOilTemp} />
          <SingleButton info = {props.lastTubingPressure} />
          <SingleButton info = {props.lastInjValveOpen} />
        </div>
    )
}

const mapStatetoProps = (state:RootState) =>{
    return {
      //the latest data
      lastFlareTemp : state.dataReducer.lastFlareTemp,
      lastWaterTemp : state.dataReducer.lastWaterTemp,
      lastCasingPressure: state.dataReducer.lastCasingPressure,
      lastOilTemp:state.dataReducer.lastOilTemp,
      lastTubingPressure:state.dataReducer.lastTubingPressure,
      lastInjValveOpen:state.dataReducer.lastInjValveOpen,
  
    }
  }
const mapDispatchToProps = (dispatch:any):any =>
      bindActionCreators({
      },dispatch)
    
  
export default connect(mapStatetoProps,mapDispatchToProps)(ToggleButton);