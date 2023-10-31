<template>
    <li>
        <div class="result-item">
            <div class="result-fond"> {{ fond_name }} </div>
            <div class="result-title"> #{{index}} - {{ title }} </div>
            <button @click="toggleDetails()">
                {{ detailsAreVisible ? 'Nascondi' : 'Visualizza' }} Dettagli
            </button>
            <div class="result-details" v-if="detailsAreVisible">
                <p v-if="content && content.length !== 0"><span class="grassetto">Descrizione</span> {{ content }}</p>
                <p v-if="extra && extra.length !== 0"><span class="grassetto">Altri dati</span><br /><span v-html="extra"></span></p>
                
            </div>
            <div class="fond_url"><a target="_parent" v-bind:href="createFondUrl(fond_id, unit_id)">Vai all'unit&agrave;</a></div>
        </div>
    </li>
</template>

<script>
export default{
    props: [
        'index', 'unit_id', 'fond_name', 'fond_id', 'title', 'content', 'extra'
    ],
    data() {
      return { detailsAreVisible: false};
    },
    methods: {
      toggleDetails() {
        this.detailsAreVisible = !this.detailsAreVisible;
      },
      createFondUrl(fond_id, unit_id) {
        import.meta.env.VITE_SOME_KEY

        return "https://archivista.provincia.lucca.it/fonds/" + fond_id + "/units/" + unit_id;
      },
    }
};
</script>

<style scoped>
    #app li {
        list-style-type: none;
        border: 1px solid rgba(0, 0, 0, 0.26)
    }

    #app .grassetto {
        font-weight: bold;
    }

    #app button {
        font: inherit;
        cursor: pointer;
        border: 1px solid #6f84f4;
        background-color: #6f84f4;
        color: white;
        padding: 0.05rem 1rem;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
    }

  #app button:hover,
  #app button:active {
    background-color: #5670fb;
    border-color: #5670fb;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
  }

    #app .result-title {
        font-size: 18px;
        font-weight: bold;
    }

    #app .result-fond {
        font-size: 14px;
        font-weight: normal;
    }

    #app .fond_url {
      margin: 8px 0 6px 0;
    }
    #app .fond_url a{
        border: 1px solid rgba(0, 0, 0, 0.26);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
        padding: 4px
    }
</style>