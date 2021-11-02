import {StatusStateSchema}from '../types'

const initialState:StatusStateSchema  ={
    flareTemp: false,
    waterTemp : false,
    casingPressure: true,
    oilTemp: true,
    tubingPressure: true,
    injValveOpen: true,
  }
  
const statusReducer = (state = initialState, action:any) =>{
  
      switch (action.type) {
     
        case 'SWITCH_BTN_STATUS' :
            return {
            ...state,
            flareTemp: action.ctx === "flareTemp" ? !state.flareTemp : state.flareTemp,
            waterTemp: action.ctx  === "waterTemp" ?  !state.waterTemp  : state.waterTemp,
            casingPressure: action.ctx  === "casingPressure" ? !state.casingPressure  : state.casingPressure,
            oilTemp: action.ctx === "oilTemp" ? !state.oilTemp : state.oilTemp,
            tubingPressure: action.ctx  === "tubingPressure" ? !state.tubingPressure  : state.tubingPressure,
            injValveOpen: action.ctx === "injValveOpen" ? !state.injValveOpen : state.injValveOpen,
            }
        default:
            return state
      }
}
  
export default statusReducer; 