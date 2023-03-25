import React from 'react';
import styles from '@/styles/Header.module.css'

function Header() {
  return (
    <header className={styles.background}>
        <div >
        <img src="/images/Watcher.png" alt="Watcher" width="15%" height="15%"/>
        </div>     
      {/* <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav> */}
    </header>
  );
}

export default Header;