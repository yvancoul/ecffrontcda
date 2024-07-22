import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Datas {
  id: string;
  Nom: string;
  Temps: number;
  desc: string;
  Ingredients: string;
  categories: string;
}

export default function FavoriteRecipes() {

    const [datas, setDatas] = useState<Datas[]>([]);
    


   
  let Stockfav: string | null = window.localStorage.getItem('myArray');

  let parsestock: string[] = [];





  if (Stockfav) {
    parsestock = JSON.parse(Stockfav) as string[];
}


let bur =  parsestock.length




    let navigate = useNavigate() 



    // récupére une clé de l'array 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://jsonecf.vercel.app/recettes'); // Appel de l'API
                setDatas(await response.json()); // Stocke les données dans l'état `datas`
                
                // Si `datas` contient des données
                if (datas) {
                   console.log('recuperation ok' )
                 
                   
                }
            } catch (err) {
                console.log('erreur a la recup '); // En cas d'erreur, vide les résultats des tâches à faire
            }
        }
      
        fetchData(); // Appel initial de la fonction pour récupérer les données
        
    }, []); 




    function Recettedetails(id:string){

        //console.log(id)
        navigate('../details/'+id)
    }
    




 function retirefavoris(id:string){

//Parse du  tableau deja existant 


  //Filtre du tableau 

  let Newarray = parsestock.filter(favori => favori !== id);

  //mise a jour de l'array 

  window.localStorage.setItem('myArray', JSON.stringify(Newarray));

  window.location.reload()


    }





   

    return (
        <>
         <Header/> 

         {bur > 0 ? (
        <section className="search">
          <div className="legend-and-search">
            <span>MES RECETTES <br /> PRÉFÉRÉES <br /></span>
          </div>
        </section>
      ) : (
        <section className="search">
          <div className="legend-and-search">
            <span>VOUS N'AVEZ PAS DE <br /> RECETTES PRÉFÉRÉES <br /></span>
          </div>
        </section>
      )}
         <section className="plats">


         {datas
  .filter(data => parsestock.includes(data.id))
  .map((data) => (
    <div className="desc" key={data.id}>
    <img src="./src/assets/img/assiete.png" alt="" className="overflow-img" />
    <div className="details">
        <br />
    <span>{data.Nom}</span><hr></hr>
    <div className="row">
    <span> </span>
            <span>📍 {data.categories}  </span>
            <span>  <br />🕐 {data.Temps} Minutes</span> <hr></hr>
            <button onClick={()=>Recettedetails(data.id)}>Voir + de details</button> <br /> 
            <button onClick={()=>retirefavoris(data.id)} id="sup"   style={{ backgroundColor: 'red', color: 'white' }}>Supprimé des favoris </button>
           
           
    </div>
    </div>
    
    
                    </div>
  ))}
        </section>


        </>
    )
}