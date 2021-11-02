import { useQuery } from "@apollo/client"
import React, {useEffect} from 'react'
import { getMultipleMeasurementsQuery} from "../../store/query/queries"
import {storeChar,StoreChar} from '../../store/actions/dataActions'
import { connect} from 'react-redux';
import {RootState}from "../../store/reducers/index"
import { ActionCreatorsMapObject, AnyAction, bindActionCreators } from 'redux';
import DropDownBar from "../dropDown/DropDownBar"
import ToggleButton from "../button/ToggleButton"
import Chart from "../chart/Chart"
 
interface Props{
    flareTemp ?: any;
    waterTemp ?:any;
    casingPressure ?: any;
    oilTemp ?: any;
    tubingPressure ?: any;
    injValveOpen ?: any;
 
    lastFlareTemp ?: any;
    lastWaterTemp ?: any;
    lastCasingPressure?: any;
    lastOilTemp?:any;
    lastTubingPressure?:any;
    lastInjValveOpen?:any;
    storeChar?:any;
}
 
function DashBoard<T>(props:Props){
  //set the after to 30 min before
  let msOfMinute = 60000;
  
  const after = new Date(props.lastInjValveOpen.at - 30 * msOfMinute).valueOf(); 
  const input = [
    {
      metricName: "flareTemp",
      after 
    },
    {
      metricName: "waterTemp",
      after 
    },
    {
      metricName: "casingPressure",
      after  
    },
    {
      metricName: "oilTemp",
      after 
    },
    {
      metricName: "tubingPressure",
      after 
    },
    {
      metricName: "injValveOpen",
        after 
    }
  ];
  //query the data of keyword
  const { data, error, loading} = useQuery(getMultipleMeasurementsQuery, {variables : {
    input
  } } )

  if(loading) {
     console.log("is laoding");
  }
  if (error) {
    console.log(error)
    
  }
  
  useEffect(() => {
    if (data){
      data.getMultipleMeasurements.forEach((item:any)=>{
        props.storeChar(item.measurements,item.metric)
      })
    }
  }, [data])
    //save the latest data  
    const renderChar =  () =>{
      if(props.flareTemp !==null && props.lastFlareTemp !== null){
        if(props.lastFlareTemp.at !== props.flareTemp[props.flareTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.flareTemp));
          newArray.push(props.lastFlareTemp);
          newArray.shift();
          props.storeChar(newArray,"flareTemp")
        }
        if(props.lastWaterTemp.at !== props.waterTemp[props.waterTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.waterTemp));
          newArray.push(props.lastWaterTemp);
          newArray.shift();
          props.storeChar(newArray,"waterTemp")
        }
        if(props.lastCasingPressure.at !== props.casingPressure[props.casingPressure.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.casingPressure));
          newArray.push(props.lastCasingPressure);
          newArray.shift();
          props.storeChar(newArray,"casingPressure")
        }
        if(props.lastOilTemp.at !== props.oilTemp[props.oilTemp.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.oilTemp));
          newArray.push(props.lastOilTemp);
          newArray.shift();
          props.storeChar(newArray,"oilTemp")
        }
        if(props.lastTubingPressure.at !== props.tubingPressure[props.tubingPressure.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.tubingPressure));
          newArray.push(props.lastTubingPressure);
          newArray.shift();
          props.storeChar(newArray,"tubingPressure")
        }
        if(props.lastInjValveOpen.at !== props.injValveOpen[props.injValveOpen.length-1].at) {
          let newArray =  JSON.parse(JSON.stringify(props.injValveOpen));
          newArray.push(props.lastInjValveOpen);
          newArray.shift();
          props.storeChar(newArray,"injValveOpen")
        }
      return (<div>
            <ToggleButton /> 
            <Chart />
            <DropDownBar />
       
      </div>)
      }else{
        return <div>Page is Loading<br/>
             Thanks for your patient!
        </div>
      }
    }
    return (
        <div>
            {renderChar( )}
        </div>
    )
}

const mapStatetoProps = (state:RootState) =>{
  return {

    flareTemp : state.dataReducer.flareTemp,
    waterTemp :state.dataReducer.waterTemp,
    casingPressure : state.dataReducer.casingPressure,
    oilTemp : state.dataReducer.oilTemp,
    tubingPressure : state.dataReducer.tubingPressure,
    injValveOpen : state.dataReducer.injValveOpen,
    //////////latst data
    lastFlareTemp : state.dataReducer.lastFlareTemp,
    lastWaterTemp : state.dataReducer.lastWaterTemp,
    lastCasingPressure: state.dataReducer.lastCasingPressure,
    lastOilTemp:state.dataReducer.lastOilTemp,
    lastTubingPressure:state.dataReducer.lastTubingPressure,
    lastInjValveOpen:state.dataReducer.lastInjValveOpen,

  }
}

const mapDispatchToProps = (dispatch:any):any =>
bindActionCreators<any,any>({storeChar},dispatch)


export default connect(mapStatetoProps,mapDispatchToProps)(DashBoard);