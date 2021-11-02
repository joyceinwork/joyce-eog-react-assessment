import { ActionCreator, ActionCreatorsMapObject } from "redux";

export const storeSubscription = (object:any,name:string) => ({
    type: 'STORE_SUBSCRIPTION',
    ctx: {object,name}
})
export const STORE_SUBSCRIPTION = 'STORE_SUBSCRIPTION';// use for sage fetching

export const storeChar = (array:any,name:string) => ({
    type: 'STORE_CHAR',
    ctx: {array,name}
})

export const updataChar = (object:any,name:string) => ({
    type: 'UPDATE_CHAR',
    ctx: {object,name}
})

export const addSave = (data:any) => ({
    type: 'ADD_SAVE',
    ctx: data
})

export const deleteSave = (data:any) => ({
    type: 'DELETE_SAVE',
    ctx: data
})

export const addSavedStatus = () => ({
    type: 'ADD_SAVED_STATUS',
    ctx: ""
})
 
export type AddSavedStatus=ReturnType<typeof addSavedStatus>;
export type StoreSubscription =ReturnType<typeof storeSubscription>;

export type  StoreChar=ReturnType<typeof storeChar>;