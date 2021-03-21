<script>
  import { db } from './firebase'
  import Posts from './Posts.svelte'

  let post = {
    nickname: '',
    learn: ''
  }

  const maxLength = 140

  const handleSubmit = () => {
    if (Object.values(post).includes("")) {
      alert("llena los campos")
      return
    }
    db.collection('posts').doc().set({
      ...post,
      creationTimestamp: Date.now()
    })
      .then(() => {
        console.log("%Post created", "color: green; font-weight: bolder")
        resetForm()
      })
      .catch(err => console.log("%cError creating the post", "color: red; font-weight: bolder", err))
  }

  const resetForm = () => {
    post = {
      nickname: '',
      learn: ''
    }
  }

  let responsePosts = []
  db.collection('posts').onSnapshot(querySnapshot => {
    let docs = []
    querySnapshot.forEach(doc => {
      docs.push(doc.data())
    })

    responsePosts = docs
  })
</script>

<main class="main-wrapper">
  <div class="main-section">
    <h1 class="title"> Learn Path </h1>

    <div class="form-wrapper">
      <form class="form-container" on:submit|preventDefault={handleSubmit}>
        <input class="text-input" bind:value={post.nickname} placeholder="Tu nickname"  />
        <textarea class="text-input" maxlength={maxLength} bind:value={post.learn} rows={6} placeholder="¿Qué te gustaría aprender?" />
        <span class="char-counter"> { post.learn.length }/{maxLength} </span>
        
        <section class="buttons-section">
          <button class="btn-warning" type="button" on:click={resetForm}>
            <p class="btn-warning-text"> Reset </p>
          </button>
          <button class="btn-success" type="submit">
            <p class="btn-success-text"> Save </p>
          </button> 
        </section>
      </form>
    </div>

    <div class="posts-container">
      <Posts data={responsePosts}/>
    </div>
  </div>
</main>

<style>
  @keyframes size-zoom {
    from { font-size: 1px; }
    to { font-size: 25px; }
  }

  .main-wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-section {
    width: 1200px;
    height: 700px;
    padding: 60px 20px 20px 20px;
    box-sizing: border-box;
    background-image: linear-gradient(to right top, #845EC2, #D65DB1, #FF6F91, #FF9671, #FFC75F, #F9F871);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .6);
    position: relative;
    display: flex;
  }

  .char-counter {
    font-size: 12px;
    color: white;
    margin: 0;
  }

  .title {
    position: absolute;
    left: 20px;
    top: 20px;
    margin: 0;
    color: white;
  }

  .form-wrapper {
    width: 350px;
    position: relative;
  }

  .form-wrapper::after {
    content: "";
    background: rgba(255, 255, 255, .3);
    width: .5px;
    height: 550px;
    position: absolute;
    top: 0;
    right: -20%;
  }

  .form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .buttons-section {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .btn-success {
    background: #5eb87a;
    min-width: 80px;
    border: none;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;
    position: relative;
  }

  .btn-success-text {
    color: white;
    font-weight: bolder;
    transition: 250ms; 
  }

  .btn-success:hover .btn-success-text {
    margin-right: 30px;
  }

  .btn-success::after {
    content: "✔";
    position: absolute;
    display: flex;
    font-size: 1px;
    justify-content: center;
    align-items: center;
    color: #5eb87a;
    width: 30px;
    height: 100%;
    background: white;
    right: -100%;
  }
  
  .btn-success:hover:after {
    transition: ease 250ms 150ms;
    animation: size-zoom 250ms 300ms forwards;
    right: 0;
  }

  .btn-warning {
    background: white;
    border: none;
    min-width: 80px;
    cursor: pointer;
    border-radius: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .btn-warning-text {
    color: tomato;
    font-weight: bolder;
    transition: 250ms; 
  }

  .btn-warning:hover .btn-warning-text {
    margin-right: 30px;
  }

  .btn-warning::after {
    content: "✘";
    position: absolute;
    display: flex;
    font-size: 1px;
    justify-content: center;
    align-items: center;
    color: tomato;
    width: 30px;
    height: 100%;
    background: white;
    right: -100%;
  }
  
  .btn-warning:hover:after {
    transition: ease 250ms 150ms;
    animation: size-zoom 250ms 300ms forwards;
    right: 0;
  }

  .text-input {
    outline: none;
    font-size: 14px;
    padding: 10px;
    border: none;
    background: rgba(0, 0, 0, .2);
    font-weight: bolder;
    color: white;
    resize: none;
  }
  .text-input::placeholder {
    color: rgba(0, 0, 0, .4);
  }

  .posts-container {
    
  }
</style>