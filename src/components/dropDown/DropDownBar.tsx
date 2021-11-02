import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleSavedData from "./SingleSavedData";
import line from "./line.png";
import {RootState} from "../../store/reducers/index";

const useStyles = makeStyles({
    container: {
        height: '50vh',
        display: "flex",
        justifyContent : "space-evenly",
        alignItems: "center",
        backgroundColor:"rgb(0,0,0,0.05)",
    },
    StatuBar: {
        position: "relative", 
        width: "85vw",
        height: "2vh",
        left:"7.5vw",
        cursor: "pointer",
         
    },
    StatuBarOpen :{
        display: "block",
        position: "absolute", 
        width: "85vw",
        height: "2vh",
        top:"50vh",
        left:"7.5vw",
        cursor: "pointer",
      
    }
  });

const DropDownBar = (props:any) =>{
    const styles = useStyles();
    const [dropDownStatus, setStatus] = useState(false) // set drop bar status
    const handleOnClick = () =>{
        setStatus(!dropDownStatus)
    }
    const dropBarRender = () =>{
        if(dropDownStatus){
            return (<div className={styles.container} >
                {props.savedData.map((item:any,index:number)=>{
                    return <SingleSavedData key={index} data={item}/>
                })}
                <img 
                onClick={handleOnClick} 
                className={styles.StatuBarOpen} 
                src={line} 
                alt="StatuBar"
                />
            </div>)
        }else{
            return (
                <img 
                onClick={handleOnClick} 
                className={styles.StatuBar} 
                src={line} 
                alt="StatuBar"
                />
            )
        }
    }
    return (
        <div>
            {dropBarRender()}
        </div>
    )
}

const mapStatetoProps = (state:RootState) =>{
    return {
      savedData : state.dataReducer.savedData,  
    }
  }
  
  const mapDispatchToProps = (dispatch:any) =>
        bindActionCreators({
        },dispatch)
    
  
  
  export default connect(mapStatetoProps,mapDispatchToProps)(DropDownBar);