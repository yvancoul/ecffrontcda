import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface Datas {
    id: string;
    Nom: string;
    Temps: number;
    desc: string;
    Ingredients: string;
    categories: string;
    image: string;
}
export default function RecipeList() {

   


    let navigate = useNavigate() 

   
    const [datas, setDatas] = useState<Datas[]>([]);

    const [recettecategorie, setRecettecategorie] = useState('');



   

    const [search , setSearch] =useState('');

    useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('https://jsonecf.vercel.app/recettes'); // Appel de l'API
            setDatas(await response.json()); // Stocke les données dans l'état `datas`
            
            // Si `datas` contient des données
            if (datas) {
               console.log('recuperation ok' )
             console.log(datas)
               
            }
        } catch (err) {
            console.log('erreur a la recup '); // En cas d'erreur, vide les résultats des tâches à faire
        }
    }
  
    fetchData(); // Appel initial de la fonction pour récupérer les données
    
}, []); 



function Recettedetails(id:string){

    //console.log(id)
    navigate('details/'+id)
}







function Localstorage(id:string){



// Récupérer le tableau existant dans le Local Storage
let retrievedArray = localStorage.getItem('myArray');
let array;

if (retrievedArray) {
    // Si le tableau existe, le parser
    array = JSON.parse(retrievedArray);
} else {
    // Sinon, initialiser un tableau vide
    array = [];
}

// Ajouter le nouvel ID au tableau
if (!array.includes(id)) {
array.push(id);
}

// Convertir le tableau en chaîne de caractères JSON
let jsonArray = JSON.stringify(array);

// Stocker le tableau dans le Local Storage
localStorage.setItem('myArray', jsonArray);


window.location.reload()
   

}







function HandleSearch(e:any){
    const  value = e.target.value

    setTimeout(() => {
        setSearch(value)
          }, 700);

   
   
 

  }




  

  // Toggle de filtre 
  let NoneBlock = true;




  // la div qui contient les inputs 
  const checkdiv = document.getElementById('checkdiv') as HTMLDivElement;
  //recuparation des inputs de filtrage 
const inputdivs = checkdiv?.querySelectorAll('input');

let valuepinput = null; // Déclaration de la variable globale





    function Buttonfiltre(){



        if (inputdivs) {
            // Ajout d'écouteurs d'événements à chaque input
            inputdivs.forEach(inputx => {
              inputx.addEventListener('change', () => {
                if (inputx.checked) {


                    valuepinput = inputx.value; // Met à jour la variable globale


                    setRecettecategorie(valuepinput)
                
                
        
                }
              });
            });
        
        
        }
        


    if(NoneBlock){

        checkdiv.style.display = "block"; 


    } else {
        checkdiv.style.display = "none"; 

    }   NoneBlock = !NoneBlock;

    
    }
 

    
 
    

    return (
        <>

<section className="search">
        <div className="legend-and-search">
            <span>DECOUVREZ ET AFFINEZ VOTRE <br />  RECHERCHE DE RECETTE <br />SELON VOS ENVIES ! </span>
 </div>
 <div> 
 <input type="text" placeholder=" 🔍 RECHERCHE ..."  onChange={HandleSearch}/>  <button onClick={Buttonfiltre} className="search-button" id='buttonfiltre'>Filtre 🧮</button> 




 <div className='checkdiv' id='checkdiv'>
    

 <div>
    <input type="radio" id="Française" name="Categorie" value="" />
    <label >All</label>
  </div>
  <div>
    <input type="radio" id="Française" name="Categorie" value="Française" />
    <label >Francaise</label>
  </div>
  <div>
    <input type="radio" id="Portugaise" name="Categorie" value="Portugaise" />
    <label >Portugaise</label>
  </div>
  <div>
   <input type="radio" id="Asiatique" name="Categorie" value="Asiatique"  />  <label> Asiatique</label>
  </div>
 </div>


  </div>

 
  


        </section>

        <section className="plats">
                {datas.filter(data => data.Nom.toLowerCase().includes(search))
                    .filter(data => recettecategorie === '' || data.categories === recettecategorie)
                    .map(data => (
                        <div className="desc" key={data.id}>
                            <img src={data.image} alt="" className="overflow-img" />
                            <div className="details">
                                <br />
                                <span>{data.Nom}</span><hr />
                                <div className="row">
                                    <span>📍 {data.categories} </span>
                                    <span>🕐 {data.Temps} Minutes</span>
                                    <hr />
                                    <div>
                                        <span>
                                            <button onClick={() => Recettedetails(data.id)}>Voir + de details</button>
                                            <br />
                                            <button onClick={() => Localstorage(data.id)}>Ajouter au favoris</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        
        </>

    );
  }
  