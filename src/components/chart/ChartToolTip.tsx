import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSave } from "../../store/actions/dataActions"
import {RootState} from "../../store/reducers/index"

const useStyles = makeStyles({
    container: {
        height: '50vh',
        width: '15vw',
        backgroundColor:"rgb(180,200,220,0.7)",
        fontFamily:"Cursive",
        padding:"10px",
        borderRadius: '10px',

    },
  });
const ChartToolTip = (ctx:any) =>{
    const [currentStatus , setStatus] = useState(0) // compare with the counter
    const styles = useStyles();
    let time = ctx.label
    const realTime = new Date(time).toLocaleTimeString()
    let i = 0;
    // find the index of the current tooltip in the full data
    for (let index = 0; index < ctx.flareTemp.length;index++){
        if (ctx.flareTemp[index].at === time){
            i = index;
        }
    }
    

    //
    if(ctx.savedStatus!== currentStatus && ctx.active) {
        let tempData = ctx.charData.filter((item:any)=>item.name === time)
        ctx.addSave(tempData[0])
        setStatus(ctx.savedStatus)
    }
    return (
        <div className={styles.container}>
            <h4>{realTime}</h4>
            <p>FlareTemp: {ctx.flareTemp[i].value} F</p>
            <p>WaterTemp: {ctx.waterTemp[i].value} F</p>
            <p>CasingPressure: {ctx.casingPressure[i].value} PSI</p>
            <p>OilTemp: {ctx.oilTemp[i].value} F</p>
            <p>TubingPressure: {ctx.tubingPressure[i].value} PSI</p>
            <p>InjValveOpen: {ctx.injValveOpen[i].value} %</p>
        </div>
    )
}


const mapStatetoProps = (state:RootState) =>{
    return {
        /////////all the data
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,
        //////////latest  
        flareTempBtn : state.statusReducer.flareTemp,
        waterTempBtn : state.statusReducer.waterTemp,
        casingPressureBtn : state.statusReducer.casingPressure,
        oilTempBtn : state.statusReducer.oilTemp,
        tubingPressureBtn : state.statusReducer.tubingPressure,
        injValveOpenBtn : state.statusReducer.injValveOpen,
      
         savedStatus : state.dataReducer.savedStatus
  
    }
  }
  
  const mapDispatchToProps = (dispatch:any) =>
        bindActionCreators({
            addSave
        },dispatch)
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(ChartToolTip);