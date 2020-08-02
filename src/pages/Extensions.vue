<template>
  <div class="static-content px-4 mx-auto">
    <vue-headful
      title="Browser Extensions - Portfolio site of Vladimir Barkasov "
    />
    <div class="text-center">
      <img class="mb-4 img-fluid rounded" src="/static/img/browser-extensions-logo.jpg" alt="browser extension development" />
      <h1>Browser extension development</h1>
    </div>
    <p>
      Do you want to simplify your actions in browser or add specific functionality in browser?<br/>
      I can help you ;)<br/>
      I can create extension for popular browsers (Google Chrome, Mozilla Firefox, Opera, Yandex Browser, <br/>
      I develop extensions for more than 8 years, and I know how to do them effectively.
    </p>

    <p>Types of browser extensions:</p>

    <ul>
      <li>
        <h2>Injections</h2>
        <p>This extensions can insert some content or code into any page. For example, an extension can shows promotional code, when user visits some site.</p>
      </li>

      <li>
        <h2>Cashbacks</h2>
        <p>Cashback extension can provide to user functionality for getting back a part of payment sum.</p>
      </li>

      <li>
        <h2>Parsers</h2>
        <p>Parser extension can parse and save any information from pages (phone numbers, emails, images, etc.)</p>
      </li>

      <li>
        <h2>Highlighters</h2>
        <p>This extensions can find and highlight some text in page. Additionally extension can shows popup with information about the highlighted text when the user hovers the mouse over the text.</p>
      </li>

      <li>
        <h2>Notifications</h2>
        <p>Extensions of this type can notify the user about celebrations or to mark a dangerous web link, which can lead to fishing sites.
        </p>
      </li>

      <li>
        <h2>Tools</h2>
        <p>Extensions-tools can add to browser additional functionality. For example, to change font family of page or to translate the selected text.
        </p>
      </li>
    </ul>
    <div class="portfolio-list card-columns mt-5">
      <portfolio-card
        v-for="result in results"
        v-bind:item="result"
        v-bind:key="result.id"
      ></portfolio-card>
    </div>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  'name': 'Extensions',
  'components': {
    PortfolioCard
  },
  data () {
    return {
      'title': 'Browser extensions development'
    }
  },
  'props': ['items'],
  'computed': {
    'results': function () {
      const results = new Set()
      const tags = [
        'extension',
        'addon'
      ]

      if (this.items.length === 0) {
        return
      }

      for (let ti = 0, tlen = tags.length; ti < tlen; ti++) {
        for (let ii = 0, ilen = this.items.length; ii < ilen; ii++) {
          if (this.items[ii].tags.indexOf(tags[ti]) !== -1) {
            results.add(this.items[ii])
          }
        }
      }
      return Array.from(results)
    }
  }
}
</script>

<style scoped></style>
