export interface DataStateSchema{
    flareTemp:any
    waterTemp:any
    casingPressure:any
    oilTemp:any
    tubingPressure:any
    injValveOpen:any
    /////////////////////
    lastFlareTemp:any
    lastWaterTemp :any
    lastCasingPressure:any
    lastOilTemp:any
    lastTubingPressure:any
    lastInjValveOpen:any
    savedData:any
    savedStatus:any
}

export interface StatusStateSchema{
    flareTemp: boolean
    waterTemp :  boolean
    casingPressure:  boolean
    oilTemp:  boolean
    tubingPressure:  boolean
    injValveOpen: boolean
}

export const DATA_STATE_SCHEMA='DATA_STATE_SCHEMA';
export const STATUS_STATE_SCHEMA='STATUS_STATE_SCHEMA';

interface MakeDataSchema{
    type:typeof DATA_STATE_SCHEMA
    payload:DataStateSchema
}

interface MakeStateSchema{
    type:typeof STATUS_STATE_SCHEMA
    payload:StatusStateSchema
}

export type ManagerReducerType=MakeDataSchema|MakeStateSchema;