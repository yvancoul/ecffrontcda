import Header from "../components/Header";
import { useEffect, useState } from 'react';

export default function Add() {
  useEffect(() => {
    // Création des regex 
    const min = /^\d{1,3}$/;
    const Nomrecette = /^[\p{L}\s]+$/u;
    const Dico = /^[a-zA-Z0-9À-ÖØ-öø-ÿ.,;:!?'"()\[\]{}\-_\s]+$/;

    // Sélection des inputs
    let inputs = document.querySelectorAll('input, textarea, select');

    // Fonction de validation
    const validateInput = (input:any) => {
      let Inputvalid = false;
      if (input.name === 'Temps') {
        Inputvalid = min.test(input.value);
      } else if (input.name === 'Nom') {
        Inputvalid = Nomrecette.test(input.value);
      } else if (input.name === 'Ingrediens' || input.name === 'desc') {
        Inputvalid = Dico.test(input.value);
      } else {
        Inputvalid = true; // Pour les autres inputs ou selects
      }

      input.style.backgroundColor = Inputvalid ? '#9ACD32' : '#F08080';
    };

    // Ajout des gestionnaires d'événements pour chaque input
    inputs.forEach(input => {
      input.addEventListener('input', (e) => validateInput(e.target));
    });

    // Nettoyage des gestionnaires d'événements lors du démontage du composant
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('input', (e) => validateInput(e.target));
      });
    };
  }, []);

  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    image: ' ',
    Nom: '',
    Temps: '',
    categories: '',
    Ingrediens: '',
    desc: '',
  });

  const Submitform = async (e:any) => {
    e.preventDefault();

    const response = await fetch('https://jsonecf.vercel.app/recettes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMsg('Recette ajoutée avec succès ');

      setFormData({
        image: ' ',
        Nom: '',
        Temps: '',
        categories: '',
        Ingrediens: '',
        desc: '',
      });
    } else {
      console.error('error');
    }
    console.log('Form data ok:', formData);
  };

  const changform = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let category = ['Française', 'Portugaise', 'Asiatique'];

  return (
    <>
      <Header />
      <section className="Formadd">
        <form onSubmit={Submitform}>
          <div className="form-group">
            <label htmlFor="img">image</label>
            <br />
            <input type="text" id="image" name="image" onChange={changform} />
          </div>
          <div className="form-group">
            <label htmlFor="Nom">Nom de la recette</label>
            <br />
            <input type="text" id="Nom" name="Nom" value={formData.Nom} onChange={changform} />
          </div>
          <div className="form-group">
            <label htmlFor="Temps">Temps de préparation</label>
            <input type="text" id="Temps" name="Temps" value={formData.Temps} onChange={changform} />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Catégorie</label>
            <select id="categories" name="categories" value={formData.categories} onChange={changform}>
              <option value="">Choisissez </option>
              {category.map((categoryx, index) => (
                <option key={index} value={categoryx}>{categoryx}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Ingrediens">Ingrédients</label>
            <input type="text" id="Ingrediens" name="Ingrediens" value={formData.Ingrediens} onChange={changform} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" name="desc" value={formData.desc} onChange={changform}></textarea>
          </div>
          <button type="submit">Ajouter la recette </button>
          {msg}
        </form>
      </section>
    </>
  );
}
