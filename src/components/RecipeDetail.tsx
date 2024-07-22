import { useParams } from "react-router-dom";
import {  useEffect, useState } from 'react';

interface Datas {
    id: string;
    Nom: string;
    Temps: number;
    desc: string;
    Ingrediens: string;
    categories: string;
}

export default function RecipeDetail() {

    

    let params = useParams() ;

    const [datas, setDatas] = useState<Datas | null>(null);

    useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('https://jsonecf.vercel.app/recettes/'+params.id); // Appel de l'API
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


return (
    <>


    <section className="plats">


    {datas ? (


                <div className="flex flex-col items-start gap-5 px-5 py-10 border border-gray-300 rounded-md shadow-md bg-gray-50 w-full">
                           
                            <img src="./assets/img/france.png" alt="" className="overflow-img" />


                    <h2 className="text-xl font-semibold text-gray-700">Recettes Details: {datas.Nom}</h2> <br />
                    <p><strong>Categories:</strong> {datas.categories}</p><br/>

                    <p><strong>Temps de cuisson :</strong> {datas.Temps} Minutes</p> <br/>
                    <p><strong>Ingredients:</strong> {datas.Ingrediens}</p><br />

                    <p><strong>Description:</strong> {datas.desc}</p><br />
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}

   

     
<button>retour a l'accueil </button>

  
    </section>

   
    
    </>

);
}