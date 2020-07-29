
import React from 'react';
import './styles.css';

const MenuBar = () => {
  return (<div class="menu" >
        <ul class="toright" dir="rtl" align="right" style={{direction: 'rtl'}}>
        <li dir="rtl"><a>חיפוש</a></li>   
        <li><a>מועדפים</a></li> 
        <li><a>מחשבון שטחים</a></li>
        <li><a>הוספת נכס</a></li>
        <li><a>קבל הצעות אישיות</a></li>
        <li><a>תגמול שותפים</a></li>
        <li class="phone">077-9985041</li>
        </ul>
</div>) 
}

export default MenuBar