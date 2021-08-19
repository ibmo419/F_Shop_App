import React from 'react'
import {Row,Col, Container} from"react-bootstrap";

const Footer=() => {
    return (
      <div>
   
         <Container fluid style={{backgroundColor:'black'}}>
              <Row  style={{fontWeight:14,fontSize:14,color:"white",justifyContent:"center"}}>
                      copyrights ©2021,all rights reserved
              </Row>
         </Container>
            
        </div>
      
    
    )
}

export default Footer