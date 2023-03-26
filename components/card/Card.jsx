import React, { useState, useEffect } from 'react';
import styles from '@/styles/Card.module.css'


function Card(props) {
  
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.seriesData.image.medium} alt={props.seriesData.name} />
      <div className={styles.cardinfo}>
        <h3>{props.seriesData.name}</h3>
        <div className={styles.tooltip}>
          <div dangerouslySetInnerHTML={{ __html: props.seriesData.summary }}/>          
        </div>
        <div className={styles.premiered}>Premiered: {props.seriesData.premiered}</div>

      </div>
      
     
    </div>   
  );
}

export default Card;