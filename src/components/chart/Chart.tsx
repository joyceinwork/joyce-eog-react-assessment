import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import ChartToolTip from "./ChartToolTip"
import {addSavedStatus} from "../../store/actions/dataActions"
import {RootState} from "../../store/reducers/index"

const useStyles = makeStyles({
    container: {
        height: '80vh',
        minWidth: '1000px',
        fontFamily:"Cursive",
    },
  });

 interface Props{
    flareTemp ? : any,
    waterTemp ? : any,
    casingPressure ? : any,
    oilTemp ? : any,
    tubingPressure ? : any,
    injValveOpen ? : any,
   
    flareTempBtn ? : any,
    waterTempBtn ? : any,
    casingPressureBtn ? : any,
    oilTempBtn ? : any,
    tubingPressureBtn ? : any,
    injValveOpenBtn ? : any,
    savedStatus?:any,
    addSavedStatus?:any
    
         
 }

const Chart = (props:Props ) =>{
    const styles = useStyles();
    const [charData, setCharData] = useState([])
    //chagne the data format to the recharts format
    //loop throught all the data
    useEffect(() => {
        let tempArray:any = []
        props.flareTemp.forEach((item:any ,index:number )=>{
            let tempSingleData = {
                name: item.at,
                flareTemp : item.value,
                waterTemp :props.waterTemp[index].value,
                casingPressure : props.casingPressure[index].value,
                oilTemp : props.oilTemp[index].value,
                tubingPressure : props.tubingPressure[index].value,
                injValveOpen : props.injValveOpen[index].value,
            }
            tempArray.push(tempSingleData)
        })
        setCharData(tempArray)
    }, [props.injValveOpen])
    const handleOnClick = () =>{ 
        
        props.addSavedStatus()
    }
    return (
        <div className={styles.container} onClick={handleOnClick} >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charData}>
                <YAxis label={{ angle: -90, value: 'unit', position: 'insideLeft' }} />
                <XAxis dataKey="name" tickFormatter={(name:any )=>new Date(name).toLocaleTimeString()} interval="preserveStartEnd" minTickGap={24} />
                <Tooltip content={<ChartToolTip charData={charData} />}/>
                <CartesianGrid  strokeDasharray="10 10" />
                <Legend />
                <Line style={{display: props.flareTempBtn? "":"none"}} type="monotone" dot={false} key="flareTemp" dataKey="flareTemp" stroke="#FC7C00" />
                <Line style={{display: props.waterTempBtn? "":"none"}} type="monotone" dot={false} key="waterTemp" dataKey="waterTemp" stroke="#8932CC" />
                <Line style={{display: props.casingPressureBtn? "":"none"}} type="monotone" dot={false} key="casingPressure" dataKey="casingPressure" stroke="#9FBC8F" />
                <Line style={{display: props.oilTempBtn? "":"none"}} type="monotone" dot={false} key="oilTemp" dataKey="oilTemp" stroke="#01CED1" />
                <Line style={{display: props.tubingPressureBtn? "":"none"}} type="monotone" dot={false} key="tubingPressure" dataKey="tubingPressure" stroke="#7F1493" />
                <Line style={{display: props.injValveOpenBtn? "":"none"}} type="monotone" dot={false} key="injValveOpen" dataKey="injValveOpen" stroke="#6CD700" />
                </LineChart>
            </ResponsiveContainer>   
        </div>
    )
}


const mapStatetoProps = (state:RootState ) =>{
    return {
        flareTemp : state.dataReducer.flareTemp,
        waterTemp :state.dataReducer.waterTemp,
        casingPressure : state.dataReducer.casingPressure,
        oilTemp : state.dataReducer.oilTemp,
        tubingPressure : state.dataReducer.tubingPressure,
        injValveOpen : state.dataReducer.injValveOpen,
        //////////display status
        flareTempBtn : state.statusReducer.flareTemp,
        waterTempBtn : state.statusReducer.waterTemp,
        casingPressureBtn : state.statusReducer.casingPressure,
        oilTempBtn : state.statusReducer.oilTemp,
        tubingPressureBtn : state.statusReducer.tubingPressure,
        injValveOpenBtn : state.statusReducer.injValveOpen,
        //////////counter
     
        savedStatus : state.dataReducer.savedStatus
      
  
    }
  }
  
  const mapDispatchToProps = (dispatch:any)  =>
        bindActionCreators({
            addSavedStatus
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Chart);