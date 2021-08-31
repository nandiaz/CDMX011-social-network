/* eslint-disable */

import { onNavigate } from '../routes.js';

import {logOutUser, dataBase, stateUser } from '../lib/fireBase.js';
//import { async } from 'regenerator-runtime';


export const toViewtimeline = (container) => {
    
    const html = `
    <header class="timelineHeader">
    <input type="button" class="btn_log google" value="salir" id="logOut" />
    <div class = "headTimeline">
      <img class="iconApp" src="img/Component 1.png">
    </div>
    </header>
    <section id="section">
    <form class="TextArea" id="postForm">
      <div class= "textAreaPost" >
        <textarea text="textArea" class="textPost" id="textPost" rows="5" cols="40" maxlength="500" placeholder="Post something :)"></textarea>
        <input type="submit" id="buttonNewPost" value="Share" /> 
      </div>
    </form>
    
  </section>
   
`;
 
    container.innerHTML = html

    const postContainer = document.createElement('div');
    postContainer.classList.add('post-box');
    container.appendChild(postContainer);

   //Log out de app
    const toLogOut = document.getElementById('logOut');
  toLogOut.addEventListener('click', () => {
   
    logOutUser().then(() => {
      onNavigate('/');
    });
  });
  //Post
 

  const posting = document.getElementById('postForm');

  const savePost = (textShare) =>
  dataBase.collection('posts').doc().set({
    textShare
  });
  const getPost = () => dataBase.collection('posts').get();

  window.addEventListener('load', async (e) =>{
   const querySnapshot = await getPost();
    querySnapshot.forEach(doc =>{
      console.log(doc.data());
      console.log(stateUser());
     
     postContainer.innerHTML += `<div class= "post_container">
      <p>${emailUser}</p>
      <h2>${doc.data().textShare}</h2>
      <div class = "buttonsDelEdit">
        <button class  = "btn_log">Delete</button>
        <button class  = "btn_log">Edit</button>
      </div>
      </div>
      `;
    })
   
   console.log("Estoy entrando");
  })
posting.addEventListener('submit', async (e)  =>{
  e.preventDefault();
   console.log("Share");
   const textShare= posting['textPost'];
   console.log(textShare);

   await savePost(textShare.value);

    posting.reset();
    textShare.focus();
   
   
} );
}
