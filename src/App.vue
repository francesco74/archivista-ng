<script>
export default {
  data() {
        return {
          words: [],
          results: [],
          enteredValue: '',
          isLoading: false,
          error: null
        };
      },
  methods: {
    addWord() {
      if (this.enteredValue !== ''){
        this.words.push(this.enteredValue);
        this.enteredValue = '';
      }
    },
    removeWord(idx) {
      this.words.splice(idx, 1);
    },
    searchWords(logic) {
      if (this.words.length == 0) {
        this.error = 'Nessun termine di ricerca inserito';
      } else {
        this.isLoading = true;
        this.error = null;
        fetch('https://archimista-api.provincia.lucca.it/archi-search', {
        //fetch('http://127.0.0.1:5000/archi-search', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify ({ words: this.words, logic: logic }) 
        }).then((response) => {
          if (response.ok) {
            return response.json()
          }
        }).then((response)  => {
          this,this.isLoading = false;
          const results = [];
          if (response) {
            if (response.status === 'ok') {
              for (const idx in response.data) {
                results.push({
                  unit_id: response.data[idx].unit_id, 
                  fond_name: response.data[idx].fond_name, 
                  fond_id: response.data[idx].fond_id, 
                  title: response.data[idx].title, 
                  content : response.data[idx].content, 
                  extra : response.data[idx].extra
                })
              }

              this.results = results;

            } else {
              throw new Error(response.message);
            } 
          } else {
            throw new Error('Impossibile effettuare la ricerca');
          }
          
        }).catch((error) => {
          this.isLoading = false;
          console.log(error);
          this.error = error;
        });
      }
    }
  }
};
</script>

<template>
  <div class="title">Ricerca avanzata unit&agrave; <span class="version">(v 1.0.0-b1)</span></div>

  <div class="search">
    <label for="text">Parola da ricercare: 
      <input type="text" id="word" v-model="enteredValue"/>
    </label>
    <button v-on:click="addWord">Aggiungi alla ricerca</button>
  </div>

  <div class="words">
    <h3 class="no-words" v-if="words.length === 0">Nessun termine selezionato</h3>
    <ul v-else>
      <li v-for="(word, index)  in words">{{ word }} <i @click="removeWord(index)" class="fa fa-trash"></i></li>
    </ul>
    <div class="search-button">
      <div class="search-button-wrapper">
        <button v-on:click="searchWords('OR')">Cerca almeno<br />un termine</button>
        <button v-on:click="searchWords('AND')">Cerca tutti<br />i termini</button>
      </div>
    </div>
    
  </div>
  
  <div class="results">
    <h3 v-if="isLoading">Ricerca in corso...</h3>
    <h3 v-else-if="error">{{ error }}</h3>
    <h3 class="no-results" v-else-if="!results || results.length === 0">Nessun risultato trovato !</h3>
    <div v-else>
      <h3>Risultati della ricerca</h3>
      <ul>
        <results-item 
          v-for="(result, index) in results" 
          :index="index+1"
          :unit_id="result.unit_id"
          :fond_name="result.fond_name"
          :fond_id="result.fond_id"
          :title="result.title"
          :content="result.content"
          :extra="result.extra">
        </results-item>
      </ul>
    </div>
  </div>
      
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Jost', sans-serif;
  }

  body {
    margin: 0;
  }

  #app .title {
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 1px solid #ccc;
    color: #58004d;
    margin: 0 0 1rem 0;
  }

  #app .title .version {
    font-size: 0.8rem;
  }
  
  header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 3rem auto;
    border-radius: 10px;
    padding: 1rem;
    background-color: #58004d;
    color: white;
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }

  #app ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #app li {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
    margin: 0.4rem auto;
    border-radius: 4px;
    padding: 0.3rem;
    text-align: center;
    width: 90%;
    max-width: 55rem;
  }

  #app button {
    font: inherit;
    cursor: pointer;
    border: 1px solid #6f84f4;
    background-color: #6f84f4;
    color: white;
    padding: 0.05rem 1rem;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
    border-radius: 4px;
  }

  #app button:hover,
  #app button:active {
    background-color: #5670fb;
    border-color: #5670fb;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
  }

  #app .search button {
    margin-left: 0.5rem;
  }

  #app .search {
    text-align: center;
  }

  #app .words li i {
    float:right;
    margin-right: 0.3rem;
    cursor: pointer;
  }

  #app .results {
    margin-top: 1rem;
  }
  #app .words h3, #app .results h3 {
    text-align: center;
  }

  #app .words .search-button  {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  #app .words .search-button button {
    margin-left :1rem;
  }

  
</style>
