import { useEffect, useState } from "react"
import { usePlayer } from "../hooks/player/usePlayer"
import { Box, Button } from "@chakra-ui/react"
import InfoPlayer from "../components/InfoPlayer"
import ControllersPlayer from "./ControllersPlayer"
import AdditionalsOptionsPlayer from "./AdditionalsOptionsPlayer"

export default function Player(){

    const {contextPlayer, getContextPlayer, player, paused, position, setPosition} = usePlayer()
    const [errorNoLog, setErrorNoLog] = useState(false)
    const [Loading, setLoading] = useState(true)
    const token = localStorage.getItem("access_token")



    useEffect(()=>{
            
            try{
                getContextPlayer().then(()=>{
                    setPosition(contextPlayer.progress_ms)
                })
                console.log(contextPlayer)
            }catch(e){
                if(e.code === 403){
                    setErrorNoLog(true)
                }
                
                console.log(e.code)
            }finally{
            setLoading(false)
            }
        
         
        
        
        
    },[])

    return(
        <>
            {(errorNoLog || Loading)&&  
                <Box
                    marginY="-20px"
                    padding="5px 40px"
                    alignItems="center"
                    background="linear-gradient(90deg, rgba(255,196,247,1) 0%, rgba(138,235,255,1) 100%)"

                    position="absolute"
                    color="white"
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    height={75}
                >
                    <div>
                        <h1> <b>Muestra de Spotify</b></h1>
                        <p>Inicia sesión para disfrutar de todas las herramientas </p>
                    </div>
                    <Button>Inicia sesión</Button>
                </Box>}
                 {!errorNoLog && !Loading &&
            
            <Box
                  
                   background="black"
                   
                   color="white"
                   display="flex"
                   justifyContent="space-between"
                   width="100%"
                   height="10vh"
                   padding="20px"
               >
   
                    <InfoPlayer info={contextPlayer.item}/>
                    <ControllersPlayer paused={paused} player={player} contextPlayer={contextPlayer} position={position}/>
                    <AdditionalsOptionsPlayer context={contextPlayer}/>
               
            </Box>
           
        } 
            
        </>
        
       
    )
}