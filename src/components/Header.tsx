import { NavLink } from 'react-router-dom';
import {   useState } from 'react';


export default function Header() {

  const [menumobile, setMenumobile] = useState(false);

  let Stockfav = window.localStorage.getItem('myArray');

  let parsestock: string[] = [];


  const toggleMenu = () => {
    setMenumobile(!menumobile);
  };


  if (Stockfav) {
    parsestock = JSON.parse(Stockfav) as string[];
}

  let bur =  parsestock.length


  
    return (
       <header>
      <nav className="navbar">
      <ul>
        <li className="profile-info">
          <div>
            <span className="gray">Location</span>
            <span>France</span>
          </div>
          <img src="./src/assets/img/france.png" alt="Profile" />

        </li>
        <li className="profile-info">
          <div>
            <span className="gray">Loged in</span>
            <span>Momo</span>

          </div>
          <img src="./src/assets/img/profil.png" alt="Location France" />

        </li>
      </ul>
      
      <ul>
      <li className="menu-item">
                <NavLink  to="/" >Accueil</NavLink>
            </li>
            <li className="menu-item">
                <NavLink to="/add" >Add</NavLink>
            </li>
            <li className="my-fav">
                <NavLink to="/fav" >
                    My Fav <span className="favlengh">{bur}</span>
                </NavLink>
            </li>
      </ul>
    </nav>


   
      <button className="icon-button" onClick={toggleMenu}>
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
   
     </button>
     <div className={`menumobile ${menumobile ? '' : 'hidden'}`}>
     <ul>
      <li className="menu-item">
                <NavLink  to="/" >Accueil</NavLink>
            </li>
            <li className="menu-item">
                <NavLink to="/add" >Add</NavLink>
            </li>
            <li className="my-fav">
                <NavLink to="/fav" >
                    My Fav <span className="favlengh">{bur}</span>
                </NavLink>
            </li>
      </ul>
</div>


      
       </header>

    );
  }
  