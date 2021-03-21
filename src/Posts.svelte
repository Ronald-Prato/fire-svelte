<script>
  import moment from 'moment'

  export let data;
</script>

<main class="main-posts-wrapper">
  {#if data.length === 0}
    <div class="posts-empty-container">
        
    </div>

  {:else}

  <div class="posts-container">
    {#each data as task}
      <div class="single-post">
        <p class="post-nickname"> 
          @{task.nickname.split("").map((letter, index) => index <= 20 ? letter : '').filter(Boolean).join("")}
          {task.nickname.split("").length > 20 ? ' ...' : ''}
        </p>
        <div class="post-learn-container">
          <p class="post-learn"> {task.learn} </p>
        </div>
        <!-- .format('dddd Do, h:mm a') -->
        <div class="post-timestamp-container">
          <p class="post-timestamp-relative"> {moment(task.creationTimestamp).startOf('minutes').fromNow()} </p>
          <p class="post-timestamp-absolute"> {moment(task.creationTimestamp).format('dddd D, h:mm a')} </p>
        </div>
      </div>
    {/each}
  </div>
  {/if}
</main>

<style>
  .main-posts-wrapper {
    margin-left: 130px;
    width: 700px;
  }

  .posts-container {
    width: 100%;
    height: 600px;
    padding-top: 20px;
    display: grid;
    grid-template-columns: 300px 300px;
    grid-template-rows: 150px;
    grid-gap: 50px;
    overflow-y: scroll;
  }

  .single-post {
    width: 300px;
    height: 150px;
    background: rgba(0, 0, 0, .3);
    color: white;
    padding: 10px;
    box-sizing: border-box;
  }

  .post-nickname,
  .post-learn,
  .post-timestamp-relative,
  .post-timestamp-absolute {
    margin: 0;
    font-weight: bolder;
  }

  .post-nickname {
    font-size: 20px;
    color:rgba(0, 0, 0, .3);
  }

  .post-learn-container {
    height: 70px;
  }

  .post-learn {
    overflow: hidden;
    font-size: 14.5px;
    margin-top: 10px;
  }

  .post-timestamp-container {
    margin-top: 10px;
    color:rgba(0, 0, 0, .3);
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .3);
    border: 3px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }

</style>