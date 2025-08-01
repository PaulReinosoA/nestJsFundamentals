import './style.css';
// import typescriptLogo from './typescript.svg';
// import { name, templateString } from './bases/01-types.ts';
// import { bulbasaur, pokemons } from './bases/02-objects.ts';
// import { charmanderAxios } from './bases/04-injections.ts';
// import { charmanderFetch } from './bases/04-injections.ts';
import { charmander } from './bases/05-decoradores.ts';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//   <h1>TypeScript + Vite HELLO!!</h1>  
//   <h1>${name}</h1>    
//   <h1>${templateString}</h1>  
//   <h1>${bulbasaur.name}</h1>  
//   <h1>${charmanderAxios.name}</h1>  
//   <h1>${charmanderFetch.name}</h1>  
//   <h1>${charmander.name}</h1>  
//   <h1>${pokemons.map((pokemon) => pokemon.name).join(', ')}</h1>  
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />      
//   <div>
// `;


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1>TypeScript + Vite HELLO!!</h1>  
  <h1>${charmander.screan()}</h1>    
`;
