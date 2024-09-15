import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faBalanceScale,
  faShoppingCart,
  faKey,
  faArrowDown,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

library.add(faArrowDown, faSearch, faHeart, faBalanceScale, faShoppingCart, faKey)

Vue.component('font-awesome-icon', FontAwesomeIcon)